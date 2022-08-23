import { AmbrosiaException, AmbrosiaResponse } from '@api/io-model';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

export enum RequestMethod {
    Get = 'get',
    Post = 'post',
}

export class RequestBuilder {
    private urlField: string[] = [];
    private queryParams: Record<keyof unknown, unknown> = {};
    private body: unknown = {};
    private requestMethod: RequestMethod = RequestMethod.Get;
    private configData: AxiosRequestConfig = {};
    constructor(baseUrl: string) {
        this.urlField.push(baseUrl);
    }
    url(url: string, ...additionalURL: string[]): this {
        this.urlField.push(url);
        for (const additionUrl of additionalURL) {
            this.urlField.push(additionUrl);
        }
        return this;
    }

    config<Key extends keyof AxiosRequestConfig>(
        key: Key,
        value: AxiosRequestConfig[Key]
    ): this {
        this.configData[key] = value;
        return this;
    }
    setConfig(config: AxiosRequestConfig): this {
        this.configData = config;
        return this;
    }
    addHeader(headers: AxiosRequestConfig['headers']): this {
        this.configData = {
            ...this.configData,
            headers: { ...this.configData.headers, ...headers },
        };
        return this;
    }
    queryParam(vals: {}): this {
        this.queryParams = Object.assign(this.queryParams, vals);
        return this;
    }
    payload(payload: any): this {
        this.body = payload;
        return this;
    }
    setMethod(method: RequestMethod): this {
        this.requestMethod = method;
        return this;
    }
    async build<T extends AmbrosiaResponse>(): Promise<T | AmbrosiaException> {
        return normalizeAxiosResponse(axios(this.buildUrl()));
    }

    private buildUrl(): AxiosRequestConfig {
        let url: string = this.urlField.join('/');
        const params: string = Object.entries(this.queryParams)
            .map(([key, value]: [string, unknown]) => `${key}=${value}`)
            .join('&');

        if (params) url += '?' + params;
        return {
            method: this.requestMethod,
            url,
            data: this.body ?? null,
            ...this.configData,
        };
    }
}
const OK_RES = [StatusCodes.ACCEPTED, StatusCodes.CREATED, StatusCodes.OK];
export async function normalizeAxiosResponse(response: Promise<AxiosResponse>) {
    return await response
        .then((response: AxiosResponse<any, any>): AmbrosiaResponse => {
            const status = response.status;
            return {
                ...response.data,
                status,
                isOk: OK_RES.includes(status),
            };
        })
        .catch((error) => {
            const response = error.response;
            const status = response.status;
            return {
                ...response.data,
                status,
                isOk: OK_RES.includes(status),
            };
        });
}
