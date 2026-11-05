interface Point {
  x: number;
  y: number;
}

interface RelativePosition extends Point {
  scale: number;
}

class Rectangle {
  public minX: number = Infinity;
  public minY: number = Infinity;
  public maxX: number = -Infinity;
  public maxY: number = -Infinity;
  constructor() {}

  calculateGroupBoundary(els: HTMLElement[]) {
    let tx = Infinity;
    let ty = Infinity;
    els.forEach((el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      this.minX = Math.min(this.minX, rect.left);
      this.minY = Math.min(this.minY, rect.top);
      this.maxX = Math.max(this.maxX, rect.right);
      this.maxY = Math.max(this.maxY, rect.bottom);
      const { x, y } = this.getTransformValues(el);
      tx = Math.min(tx, x);
      ty = Math.min(ty, y);
    });

    return {
      x: this.minX,
      y: this.minY,
      width: this.maxX - this.minX,
      height: this.maxY - this.minY,
      maxX: this.maxX,
      maxY: this.maxY,
      tx,
      ty
    };
  }

  getTransformValues(el: HTMLElement) {
    const result: RelativePosition = {
      x: 0,
      y: 0,
      scale: 1,
    };
    const style = window.getComputedStyle(el);
    const transform = style.transform;

    if (!transform || transform === "none") return result;

    const matrixMatch: any = transform.match(/^matrix\((.+)\)$/);
    if (matrixMatch) {
      const [a, , , , tx, ty] = matrixMatch[1].split(",").map(Number);
      return {
        ...result,
        x: tx || 0,
        y: ty || 0,
        scale: a || 1,
      };
    }

    const translateMatch: any = transform.match(/translate(?:3d)?\(([^)]+)\)/);
    if (translateMatch) {
      const [x, y] = translateMatch[1].split(/\s*,\s*/).map(parseFloat);
      result.x = x || 0;
      result.y = y || 0;
    }

    const scaleMatch: any = transform.match(/scale(?:3d)?\(([^)]+)\)/);
    if (scaleMatch) {
      const [scale] = scaleMatch[1].split(/\s*,\s*/).map(parseFloat);
      result.scale = scale || 1;
    }

    return result;
  }
}

export const useRectangle = () => {

  const rectangle = new Rectangle();

  const calculateBoundary = async (els: HTMLElement[]) => {
    return Promise.resolve(rectangle.calculateGroupBoundary(els));
  };

  const transformValues = (el: HTMLElement) => {
    return Promise.resolve(rectangle.getTransformValues(el));
  };

  return {
    calculateBoundary,
    transformValues,
  };
};
