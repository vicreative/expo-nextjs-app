import env from 'app/config/env';

/**
 * Function to generate invite link
 *
 * If app is not installed it takes the user to app/playstore to download the app first then opens the app with the invitelink
 * If app is installed it opens the application immediately
 *
 * @param { string } props.channel - The channel to send generated link to (e.g 'email', 'whatsapp', 'instagram')
 * @param { string } props.campaign - A campaign for the link (e.g 'Experience', 'Message')
 * @param { string } props.customerID - The userId
 * @param { object } props.userParams - custom queryparams to pass to the url
 * @param { func } props.doSomethingWithInviteLink - Any custom function to call after the link has been generated
 *
 * @returns { url: string }
 */
export default function generateInviteLink(
  channel = '',
  campaign = '',
  customerID = '',
  userParams = []
) {
  if (typeof window !== 'undefined') {
    //Initializing Smart Script arguments
    const oneLinkURL = `https://expitradev.onelink.me/${env.APP_FLYER_TEMPLATE_ID}`;
    const mediaSource = { defaultValue: 'any_source' };
    const custom_ss_ui = { paramKey: 'af_ss_ui', defaultValue: 'true' };
    const pathname = {
      paramKey: 'pathname',
      defaultValue: window.location.pathname
    };

    //Onelink URL is generated.
    let result = window?.AF_SMART_SCRIPT?.generateOneLinkURL({
      oneLinkURL: oneLinkURL,
      afParameters: {
        mediaSource: mediaSource,
        channel,
        campaign,
        customerID,
        afCustom: [custom_ss_ui, pathname, ...userParams]
      }
    });

    if (result) {
      const resultUrl = result.clickURL;
      document.getElementById('andrd_link')?.setAttribute('href', resultUrl);
      document.getElementById('ios_link')?.setAttribute('href', resultUrl);
      // window.AF_SMART_SCRIPT?.displayQrCode('my_qr_code_div_id');
      return resultUrl;
    } else {
      return null;
    }
  }
  // If needed, you can download the script from: https://onelinksmartscript.appsflyer.com/onelink-smart-script-latest.js

  // See an example of implementation and how to place the URL result behind a CTA on your website: https://appsflyersdk.github.io/appsflyer-onelink-smart-script/examples/utm_parameters.html?utm_campaign=mycmpn&utm_source=mysource

  // See an example of how to display a QR code: https://appsflyersdk.github.io/appsflyer-onelink-smart-script/examples/qr_code.html?inmedia=my_email&incmp=my_campaign
}
