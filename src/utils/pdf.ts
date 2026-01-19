import { SITE_CONFIG } from "@/config";
import QRCode from 'qrcode';

export function makePdfContent(url:string, content:string) {
    return new Promise<string>((resolve) => {
        QRCode.toDataURL(url, (_:any, src:string) => {
            resolve(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>萌萌表情包</title>
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.8.1/github-markdown-light.min.css"/>
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/github.min.css">
                        <style>
                            :root {
                                --mui-palette-primary-main: #39c5bb;
                                --mui-palette-primary-light: rgb(96, 208, 200);
                                --mui-palette-primary-dark: rgb(39, 137, 130);
                                --mui-palette-primary-contrastText: rgba(0, 0, 0, 0.87);
                                --mui-palette-primary-mainChannel: 57 197 187;
                                --mui-palette-primary-lightChannel: 96 208 200;
                                --mui-palette-primary-darkChannel: 39 137 130;
                                --mui-palette-primary-contrastTextChannel: 0 0 0;
                                --mui-palette-secondary-50: #fce4ec;
                                --mui-palette-secondary-100: #f8bbd0;
                                --mui-palette-secondary-200: #f48fb1;
                                --mui-palette-secondary-300: #f06292;
                                --mui-palette-secondary-400: #ec407a;
                                --mui-palette-secondary-500: #e91e63;
                                --mui-palette-secondary-600: #d81b60;
                                --mui-palette-secondary-700: #c2185b;
                                --mui-palette-secondary-800: #ad1457;
                                --mui-palette-secondary-900: #880e4f;
                                --mui-palette-secondary-A100: #ff80ab;
                                --mui-palette-secondary-A200: #ff4081;
                                --mui-palette-secondary-A400: #f50057;
                                --mui-palette-secondary-A700: #c51162;
                                --mui-palette-secondary-main: #f50057;
                                --mui-palette-secondary-light: #ff4081;
                                --mui-palette-secondary-dark: #c51162;
                                --mui-palette-secondary-contrastText: #fff;
                                --mui-palette-secondary-mainChannel: 245 0 87;
                                --mui-palette-secondary-lightChannel: 255 64 129;
                                --mui-palette-secondary-darkChannel: 197 17 98;
                                --mui-palette-secondary-contrastTextChannel: 255 255 255;
                                --mui-palette-info-main: #66CCFF;
                                --mui-palette-info-light: rgb(132, 214, 255);
                                --mui-palette-info-dark: rgb(71, 142, 178);
                                --mui-palette-info-contrastText: rgba(0, 0, 0, 0.87);
                                --mui-palette-info-mainChannel: 102 204 255;
                                --mui-palette-info-lightChannel: 132 214 255;
                                --mui-palette-info-darkChannel: 71 142 178;
                                --mui-palette-info-contrastTextChannel: 0 0 0;
                                --mui-palette-common-black: #000;
                                --mui-palette-common-white: #fff;
                                --mui-palette-common-background: #fff;
                                --mui-palette-common-onBackground: #000;
                                --mui-palette-common-backgroundChannel: 255 255 255;
                                --mui-palette-common-onBackgroundChannel: 0 0 0;
                                --mui-palette-error-main: #d32f2f;
                                --mui-palette-error-light: #ef5350;
                                --mui-palette-error-dark: #c62828;
                                --mui-palette-error-contrastText: #fff;
                                --mui-palette-error-mainChannel: 211 47 47;
                                --mui-palette-error-lightChannel: 239 83 80;
                                --mui-palette-error-darkChannel: 198 40 40;
                                --mui-palette-error-contrastTextChannel: 255 255 255;
                                --mui-palette-warning-main: #ed6c02;
                                --mui-palette-warning-light: #ff9800;
                                --mui-palette-warning-dark: #e65100;
                                --mui-palette-warning-contrastText: #fff;
                                --mui-palette-warning-mainChannel: 237 108 2;
                                --mui-palette-warning-lightChannel: 255 152 0;
                                --mui-palette-warning-darkChannel: 230 81 0;
                                --mui-palette-warning-contrastTextChannel: 255 255 255;
                                --mui-palette-success-main: #2e7d32;
                                --mui-palette-success-light: #4caf50;
                                --mui-palette-success-dark: #1b5e20;
                                --mui-palette-success-contrastText: #fff;
                                --mui-palette-success-mainChannel: 46 125 50;
                                --mui-palette-success-lightChannel: 76 175 80;
                                --mui-palette-success-darkChannel: 27 94 32;
                                --mui-palette-success-contrastTextChannel: 255 255 255;
                                --mui-palette-grey-50: #fafafa;
                                --mui-palette-grey-100: #f5f5f5;
                                --mui-palette-grey-200: #eeeeee;
                                --mui-palette-grey-300: #e0e0e0;
                                --mui-palette-grey-400: #bdbdbd;
                                --mui-palette-grey-500: #9e9e9e;
                                --mui-palette-grey-600: #757575;
                                --mui-palette-grey-700: #616161;
                                --mui-palette-grey-800: #424242;
                                --mui-palette-grey-900: #212121;
                                --mui-palette-grey-A100: #f5f5f5;
                                --mui-palette-grey-A200: #eeeeee;
                                --mui-palette-grey-A400: #bdbdbd;
                                --mui-palette-grey-A700: #616161;
                                --mui-palette-text-primary: rgba(0, 0, 0, 0.87);
                                --mui-palette-text-secondary: rgba(0, 0, 0, 0.6);
                                --mui-palette-text-disabled: rgba(0, 0, 0, 0.38);
                                --mui-palette-text-primaryChannel: 0 0 0;
                                --mui-palette-text-secondaryChannel: 0 0 0;
                                --mui-palette-divider: rgba(0, 0, 0, 0.12);
                                --mui-palette-background-paper: #fff;
                                --mui-palette-background-default: #fff;
                                --mui-palette-background-defaultChannel: 255 255 255;
                                --mui-palette-background-paperChannel: 255 255 255;
                                --mui-palette-action-active: rgba(0, 0, 0, 0.54);
                                --mui-palette-action-hover: rgba(0, 0, 0, 0.04);
                                --mui-palette-action-hoverOpacity: 0.04;
                                --mui-palette-action-selected: rgba(0, 0, 0, 0.08);
                                --mui-palette-action-selectedOpacity: 0.08;
                                --mui-palette-action-disabled: rgba(0, 0, 0, 0.26);
                                --mui-palette-action-disabledBackground: rgba(0, 0, 0, 0.12);
                                --mui-palette-action-disabledOpacity: 0.38;
                                --mui-palette-action-focus: rgba(0, 0, 0, 0.12);
                                --mui-palette-action-focusOpacity: 0.12;
                                --mui-palette-action-activatedOpacity: 0.12;
                                --mui-palette-action-activeChannel: 0 0 0;
                                --mui-palette-action-selectedChannel: 0 0 0;
                                --mui-palette-Alert-errorColor: rgb(95, 33, 32);
                                --mui-palette-Alert-infoColor: rgb(52, 85, 102);
                                --mui-palette-Alert-successColor: rgb(30, 70, 32);
                                --mui-palette-Alert-warningColor: rgb(102, 60, 0);
                                --mui-palette-Alert-errorFilledBg: var(--mui-palette-error-main, #d32f2f);
                                --mui-palette-Alert-infoFilledBg: var(--mui-palette-info-main, #66CCFF);
                                --mui-palette-Alert-successFilledBg: var(--mui-palette-success-main, #2e7d32);
                                --mui-palette-Alert-warningFilledBg: var(--mui-palette-warning-main, #ed6c02);
                                --mui-palette-Alert-errorFilledColor: #fff;
                                --mui-palette-Alert-infoFilledColor: rgba(0, 0, 0, 0.87);
                                --mui-palette-Alert-successFilledColor: #fff;
                                --mui-palette-Alert-warningFilledColor: #fff;
                                --mui-palette-Alert-errorStandardBg: rgb(253, 237, 237);
                                --mui-palette-Alert-infoStandardBg: rgb(242, 250, 255);
                                --mui-palette-Alert-successStandardBg: rgb(237, 247, 237);
                                --mui-palette-Alert-warningStandardBg: rgb(255, 244, 229);
                                --mui-palette-Alert-errorIconColor: var(--mui-palette-error-main, #d32f2f);
                                --mui-palette-Alert-infoIconColor: var(--mui-palette-info-main, #66CCFF);
                                --mui-palette-Alert-successIconColor: var(--mui-palette-success-main, #2e7d32);
                                --mui-palette-Alert-warningIconColor: var(--mui-palette-warning-main, #ed6c02);
                                --mui-palette-AppBar-defaultBg: var(--mui-palette-grey-100, #f5f5f5);
                                --mui-palette-Avatar-defaultBg: var(--mui-palette-grey-400, #bdbdbd);
                                --mui-palette-Button-inheritContainedBg: var(--mui-palette-grey-300, #e0e0e0);
                                --mui-palette-Button-inheritContainedHoverBg: var(--mui-palette-grey-A100, #f5f5f5);
                                --mui-palette-Chip-defaultBorder: var(--mui-palette-grey-400, #bdbdbd);
                                --mui-palette-Chip-defaultAvatarColor: var(--mui-palette-grey-700, #616161);
                                --mui-palette-Chip-defaultIconColor: var(--mui-palette-grey-700, #616161);
                                --mui-palette-FilledInput-bg: rgba(0, 0, 0, 0.06);
                                --mui-palette-FilledInput-hoverBg: rgba(0, 0, 0, 0.09);
                                --mui-palette-FilledInput-disabledBg: rgba(0, 0, 0, 0.12);
                                --mui-palette-LinearProgress-primaryBg: rgb(179, 232, 229);
                                --mui-palette-LinearProgress-secondaryBg: rgb(251, 158, 191);
                                --mui-palette-LinearProgress-errorBg: rgb(238, 175, 175);
                                --mui-palette-LinearProgress-infoBg: rgb(196, 235, 255);
                                --mui-palette-LinearProgress-successBg: rgb(175, 205, 177);
                                --mui-palette-LinearProgress-warningBg: rgb(248, 199, 158);
                                --mui-palette-Skeleton-bg: rgba(var(--mui-palette-text-primaryChannel, undefined) / 0.11);
                                --mui-palette-Slider-primaryTrack: rgb(179, 232, 229);
                                --mui-palette-Slider-secondaryTrack: rgb(251, 158, 191);
                                --mui-palette-Slider-errorTrack: rgb(238, 175, 175);
                                --mui-palette-Slider-infoTrack: rgb(196, 235, 255);
                                --mui-palette-Slider-successTrack: rgb(175, 205, 177);
                                --mui-palette-Slider-warningTrack: rgb(248, 199, 158);
                                --mui-palette-SnackbarContent-bg: rgb(50, 50, 50);
                                --mui-palette-SnackbarContent-color: #fff;
                                --mui-palette-SpeedDialAction-fabHoverBg: rgb(216, 216, 216);
                                --mui-palette-StepConnector-border: var(--mui-palette-grey-400, #bdbdbd);
                                --mui-palette-StepContent-border: var(--mui-palette-grey-400, #bdbdbd);
                                --mui-palette-Switch-defaultColor: var(--mui-palette-common-white, #fff);
                                --mui-palette-Switch-defaultDisabledColor: var(--mui-palette-grey-100, #f5f5f5);
                                --mui-palette-Switch-primaryDisabledColor: rgb(179, 232, 229);
                                --mui-palette-Switch-secondaryDisabledColor: rgb(251, 158, 191);
                                --mui-palette-Switch-errorDisabledColor: rgb(238, 175, 175);
                                --mui-palette-Switch-infoDisabledColor: rgb(196, 235, 255);
                                --mui-palette-Switch-successDisabledColor: rgb(175, 205, 177);
                                --mui-palette-Switch-warningDisabledColor: rgb(248, 199, 158);
                                --mui-palette-TableCell-border: rgba(224, 224, 224, 1);
                                --mui-palette-Tooltip-bg: rgba(97, 97, 97, 0.92);
                                --mui-palette-dividerChannel: 0 0 0;
                                --mui-opacity-inputPlaceholder: 0.42;
                                --mui-opacity-inputUnderline: 0.42;
                                --mui-opacity-switchTrackDisabled: 0.12;
                                --mui-opacity-switchTrack: 0.38;
                            }

                            code {
                                white-space: pre-wrap !important;       /* 保留换行 + 允许自动换行 */
                                word-break: break-word !important;      /* 兜底，防止超长 token */
                            }

                            .no-print, .no-print * {
                                display:none !important;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="markdown-body">
                            <img style="float:right;" src="${src}"/>
                            <p><a href="${url}">${SITE_CONFIG.title} : ${SITE_CONFIG.origin}${SITE_CONFIG.basePath}</a></p>
                            <div>${content}</div>
                        </div>
                    </body>
                    </html>
                    `);
        });
    });
}