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