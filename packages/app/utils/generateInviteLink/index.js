import appsFlyer from 'react-native-appsflyer';

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
  channel,
  campaign,
  customerID,
  userParams = {},
  doSomethingWithInviteLink = () => {}
) {
  appsFlyer.generateInviteLink(
    {
      channel,
      campaign,
      customerID,
      userParams
    },
    link => {
      doSomethingWithInviteLink(link);
    },
    err => {
      console.warn(err);
    }
  );
}
