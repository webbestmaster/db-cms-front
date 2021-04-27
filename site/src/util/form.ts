import React from 'react';

// import {Locale} from '../provider/locale/c-locale';
// import {LangKeyType} from '../provider/locale/translation/type';

export const requiredFieldRule = {
    required: true /* , message: <Locale stringKey="VALIDATION__ERROR__FIELD_IS_REQUIRED"/>*/,
};

/*
type FormRuleType = {
    validator: (formItemData: unknown, value: boolean) => Promise<void>;
};

export function getRequiredCheckBoxRule(getLocalizedString: (stringKey: LangKeyType) => string): FormRuleType {
    return {
        validator: (formItemData: unknown, value: boolean): Promise<void> => {
            if (value) {
                return Promise.resolve();
            }

            return Promise.reject(new Error(getLocalizedString('VALIDATION__ERROR__FIELD_IS_REQUIRED')));
        },
    };
}
*/
