/* global fetch, Headers, FormData, Response */

type OptionsType = {
    method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'; // GET, POST, PUT, DELETE, etc. (default: GET)
    credentials?: 'include' | 'same-origin' | 'omit'; // include, same-origin, omit (default: same-origin)
    headers?: Headers | Array<Array<string>> | Record<string, string>;
    body?: FormData | string; // body data type must match "Content-Type" header
};

export function fetchX<ExpectedResponseType>(url: string, options?: OptionsType): Promise<ExpectedResponseType> {
    const definedOptions: OptionsType = {
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        ...options || {},
    };

    return fetch(url, definedOptions).then(
        (result: Response): Promise<ExpectedResponseType> => {
            if (result.ok) {
                return result.json();
            }

            throw new Error(JSON.stringify(result));
        }
    );
}
