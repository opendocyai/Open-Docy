export type SSEStatus =
	| 'idle'
	| 'connecting'
	| 'connected'
	| 'reconnecting'
	| 'disconnected'

export interface SSEMessage {
	event?: string
	[key: string]: any
}

export interface SSEManagerOptions {

	url: string

	getToken: () => string

	refreshToken: () => Promise<boolean>


	maxRetryCount?: number

	baseDelay?: number

	maxDelay?: number

	debug?: boolean

	onMessage?: (data: SSEMessage, event: MessageEvent) => void

	onConnected?: () => void

	onDisconnected?: () => void

	onForceLogout?: (data: SSEMessage) => void

	onError?: (error: Event) => void

	onErrorReconnect?: (error: Event) => void
}
