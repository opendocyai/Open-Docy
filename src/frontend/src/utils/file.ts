let fileIdCounter = 1;

export class FileClass {
  getFileExtension(src: string): string {
    return (
      src.split("?")[0]?.split("#")[0]?.split(".")?.pop()?.toLowerCase() || ""
    );
  }

  getFileExtensionFromFile(file: File): string {
    return this.getFileExtension(file.name);
  }

  genFileId = (prefix = "u") => {
    return `${prefix}${Date.now() + fileIdCounter++}`;
  };
}

const file = new FileClass();

export const getFileExtension = file.getFileExtension.bind(file);

export const getFileExtensionFromFile =
  file.getFileExtensionFromFile.bind(file);

export const genFileId = file.genFileId.bind(file);

export default file;
