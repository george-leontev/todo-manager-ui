import { formatMessage } from "devextreme/localization";
import notify from "devextreme/ui/notify";

export const notifyWrapper = async <T>(requestCallbackAsync: () => Promise<T | undefined>) => {

    try {
        return await requestCallbackAsync();
    } catch (error) {
        notify({
            message: formatMessage('httpErrorMessage', (error as Error).message),
            type: 'error',
            displayTime: 2000
        });
    }
}

const isoDateFormat = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/;

function isIsoDateString(value: any): boolean {
    return value && typeof value === "string" && isoDateFormat.test(value);
}

export function handleDates(body: any) {
    if (body === null || body === undefined || typeof body !== "object")
        return body;

    for (const key of Object.keys(body)) {
        const value = body[key];
        if (isIsoDateString(value)) {
            body[key] = new Date(Date.parse(value));
        } else if (typeof value === "object") {
            handleDates(value)
        };
    }
}
