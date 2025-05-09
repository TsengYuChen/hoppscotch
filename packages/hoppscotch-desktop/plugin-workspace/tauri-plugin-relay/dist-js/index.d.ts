export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS" | "CONNECT" | "TRACE";
export type Version = "HTTP/1.0" | "HTTP/1.1" | "HTTP/2.0" | "HTTP/3.0";
export type StatusCode = 100 | 101 | 102 | 103 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511;
export type FormDataValue = {
    kind: "text";
    value: string;
} | {
    kind: "file";
    filename: string;
    contentType: string;
    data: Uint8Array;
};
export type FormData = [string, FormDataValue[]][];
export declare enum MediaType {
    TEXT_PLAIN = "text/plain",
    TEXT_HTML = "text/html",
    TEXT_CSS = "text/css",
    TEXT_CSV = "text/csv",
    APPLICATION_JSON = "application/json",
    APPLICATION_LD_JSON = "application/ld+json",
    APPLICATION_XML = "application/xml",
    TEXT_XML = "text/xml",
    APPLICATION_FORM = "application/x-www-form-urlencoded",
    APPLICATION_OCTET = "application/octet-stream",
    MULTIPART_FORM = "multipart/form-data"
}
export type ContentType = {
    kind: "text";
    content: string;
    mediaType: MediaType.TEXT_PLAIN | MediaType.TEXT_HTML | MediaType.TEXT_CSS | MediaType.TEXT_CSV;
} | {
    kind: "json";
    content: unknown;
    mediaType: MediaType.APPLICATION_JSON | MediaType.APPLICATION_LD_JSON;
} | {
    kind: "xml";
    content: string;
    mediaType: MediaType.APPLICATION_XML | MediaType.TEXT_XML;
} | {
    kind: "form";
    content: FormData;
    mediaType: MediaType.APPLICATION_FORM;
} | {
    kind: "binary";
    content: Uint8Array;
    mediaType: MediaType.APPLICATION_OCTET | string;
    filename?: string;
} | {
    kind: "multipart";
    content: FormData;
    mediaType: MediaType.MULTIPART_FORM;
} | {
    kind: "urlencoded";
    content: string;
    mediaType: MediaType.APPLICATION_FORM;
} | {
    kind: "stream";
    content: ReadableStream;
    mediaType: string;
};
export interface ResponseBody {
    body: Uint8Array;
    mediaType: MediaType | string;
}
export type AuthType = {
    kind: "none";
} | {
    kind: "basic";
    username: string;
    password: string;
} | {
    kind: "bearer";
    token: string;
} | {
    kind: "digest";
    username: string;
    password: string;
    realm?: string;
    nonce?: string;
    opaque?: string;
    algorithm?: "MD5" | "SHA-256" | "SHA-512";
    qop?: "auth" | "auth-int";
    nc?: string;
    cnonce?: string;
} | {
    kind: "oauth2";
    grantType: {
        kind: "authorization_code";
        authEndpoint: string;
        tokenEndpoint: string;
        clientId: string;
        clientSecret?: string;
    } | {
        kind: "client_credentials";
        tokenEndpoint: string;
        clientId: string;
        clientSecret?: string;
    } | {
        kind: "password";
        tokenEndpoint: string;
        username: string;
        password: string;
    } | {
        kind: "implicit";
        authEndpoint: string;
        clientId: string;
    };
    accessToken?: string;
    refreshToken?: string;
} | {
    kind: "apikey";
    key: string;
    value: string;
    in: "header" | "query";
} | {
    kind: "aws";
    accessKey: string;
    secretKey: string;
    region: string;
    service: string;
    sessionToken?: string;
    in: "header" | "query";
};
export type CertificateType = {
    kind: "pem";
    cert: Uint8Array;
    key: Uint8Array;
} | {
    kind: "pfx";
    data: Uint8Array;
    password: string;
};
export interface Request {
    id: number;
    url: string;
    method: Method;
    version: Version;
    headers?: Record<string, string>;
    params?: Record<string, string>;
    content?: ContentType;
    auth?: AuthType;
    security?: {
        certificates?: {
            client?: CertificateType;
            ca?: Array<Uint8Array>;
        };
        verifyHost?: boolean;
        verifyPeer?: boolean;
    };
    proxy?: {
        url: string;
        auth?: {
            username: string;
            password: string;
        };
    };
}
export interface Response {
    id: number;
    status: StatusCode;
    statusText: string;
    version: Version;
    headers: Record<string, string>;
    cookies?: Array<{
        name: string;
        value: string;
        domain?: string;
        path?: string;
        expires?: Date;
        secure?: boolean;
        httpOnly?: boolean;
        sameSite?: 'Strict' | 'Lax' | 'None';
    }>;
    body: ResponseBody;
    meta: {
        timing: {
            start: number;
            end: number;
        };
        size: {
            headers: number;
            body: number;
            total: number;
        };
    };
}
export type UnsupportedFeatureError = {
    kind: "unsupported_feature";
    feature: string;
    message: string;
    relay: string;
};
export type RelayError = UnsupportedFeatureError | {
    kind: "network";
    message: string;
    cause?: unknown;
} | {
    kind: "timeout";
    message: string;
    phase?: "connect" | "tls" | "response";
} | {
    kind: "certificate";
    message: string;
    cause?: unknown;
} | {
    kind: "parse";
    message: string;
    cause?: unknown;
} | {
    kind: "abort";
    message: string;
};
export type RequestResult = {
    kind: 'success';
    response: Response;
} | {
    kind: 'error';
    error: RelayError;
};
export declare function execute(request: Request): Promise<RequestResult>;
export declare function cancel(requestId: number): Promise<void>;
//# sourceMappingURL=index.d.ts.map