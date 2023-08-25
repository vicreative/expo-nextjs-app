import colors from 'app/config/theme/colors';
import spacing from 'app/config/theme/spacing';
import moment from 'moment';
import { numberWithCommas, truncate } from './index';
import { resolvePrice } from './resolvePrice';

/**
 * generate pdf for transaction details
 *
 * @param {amount, recipient, sender, reference, date}
 */
export const transactionDetailsPdf = (
  amount,
  recipient,
  sender,
  remark,
  reference,
  date,
  currency
) =>
  `
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      <title>Receipt</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap');

        html {
                height: 100%;
              }
        body {
                margin: 0;
                min-height: 100%;
                overflow-x: hidden;
                font-family: 'DM Sans', sans-serif;
              }
        * {
            box-sizing: border-box;
          }
        h1 {
              margin-top: 0;
              text-align: center;
              font-weight: 700;
              font-family: 'DM Sans', sans-serif;
            }
        p {
            font-family: 'DM Sans', sans-serif;
          }
         .container {
            display:flex; 
            justify-content: center; 
            align-items: center; 
            height: 100%;
          }
          .ticket-container {
            display: flex; 
            position: relative; 
            justify-content: center;
          }
          .ticket-content {
            position: absolute; 
            top: 60px;
          }
          .logo-container {
            align-items: center;
            justify-content: center;
            width: 100%;
            text-align: center;
          }
          .amount-container {
            align-items: center;
            justify-content: center;
          }
          .amount {
            font-size: ${spacing[32]}px;
            font-weight: 700;
            text-align: center;
            line-height: 20px;
          }
           .amount {
            font-size: 36px;
            font-weight: 700;
            text-align: center;
            line-height: 20px;
          }
          .amount-paid {
            font-size: ${spacing[13]}px;
            font-weight: 400;
            color: ${colors.gray[300]};
            text-align: center;
            margin-top: -14px;
          }
          .dashed-divider {
            height: 2px;
            width: 410px;
            margin-top: 20px;
            border-top-style: dashed;
            border-top-color: ${colors.gray[100]};
            border-top-width: 2px;
          }
          .divider {
            height: 2px;
            width: 410px;
            background-color: ${colors.gray[100]};
            margin-bottom: 10px;
          }
          .sections {
            position: absolute; 
            top: 220px;
            left: 16%;
            margin-top: 10px;
            margin-bottom: 10px;
          }
          .section-title { 
            opacity: 0.5; 
            font-weight: 400;
            color: ${colors.gray[500]};
            font-size: ${spacing[18]}px;
            padding-top: 14px;
          }
          .section-text {
            color: ${colors.base.black};
            font-size: ${spacing[13]}px;
            font-weight: 400;
            margin-top: -10px;
          }
      </style>
    </head>
    <body class="container">
      <div class="ticket-container">
        <svg width="600" height="800" viewBox="0 0 414 637" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_7362_20342)">
            <path d="M390 23.521C390 18.815 385.997 15 381.06 15H33.4992C28.5616 15 24.5588 18.815 24.5588 23.521L24 192.877C30.7893 192.877 36.2931 198.122 36.2931 204.593C36.2931 211.064 30.7893 216.31 24 216.31L24.5588 381.937V593.479C24.5588 598.185 28.5616 602 33.4992 602H381.06C385.997 602 390 598.185 390 593.479V356.907V216C383.211 216 377.148 211.064 377.148 204.593C377.148 198.122 383.211 192.5 390 192.5V23.521Z" fill="white"/>
            <path d="M25.0588 23.5227V23.521C25.0588 19.1135 28.8148 15.5 33.4992 15.5H381.06C385.744 15.5 389.5 19.1135 389.5 23.521V192.01C382.669 192.277 376.648 197.977 376.648 204.593C376.648 211.243 382.706 216.256 389.5 216.491V356.907V593.479C389.5 597.886 385.744 601.5 381.06 601.5H33.4992C28.8148 601.5 25.0588 597.886 25.0588 593.479L25.0588 381.937L25.0588 381.936L24.5017 216.8C31.3136 216.549 36.7931 211.201 36.7931 204.593C36.7931 197.985 31.3136 192.637 24.5016 192.386L25.0588 23.5227Z" stroke="#EAEAEA"/>
          </g>
          <defs>
            <filter id="filter0_d_7362_20342" x="-1" y="0" width="416" height="637" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="10"/>
              <feGaussianBlur stdDeviation="12.5"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.592157 0 0 0 0 0.560784 0 0 0 0 0.686275 0 0 0 0.08 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7362_20342"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7362_20342" result="shape"/>
            </filter>
          </defs>
        </svg>
        <div class="ticket-content">
          <div class="logo-container">
            <svg width="150" height="32" viewBox="0 0 167 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_9637_60191)">
                <path d="M23.879 16.5814L20.6663 19.3751L16.7836 16.0564L16.1574 15.5126L13.3706 13.1251L11.9365 11.8751L7.68435 8.21265C7.40444 7.97561 7.07663 7.80156 6.72325 7.70234C6.36988 7.60311 5.99923 7.58105 5.63654 7.63765C4.88094 7.7614 4.19698 8.15718 3.71397 8.75015C3.21201 9.28328 2.93257 9.98733 2.93257 10.7189C2.93257 11.4505 3.21201 12.1545 3.71397 12.6876L6.40681 15.2501C6.74035 15.5634 7.13479 15.8048 7.56569 15.9597C7.99658 16.1145 8.45475 16.1793 8.91178 16.1501C9.90766 16.1044 10.8494 15.6847 11.5483 14.9751L12.7131 13.8001L15.4748 16.1876L14.2223 17.3751C12.8004 18.7588 10.8976 19.5403 8.91178 19.5564C8.03196 19.5726 7.15786 19.4122 6.34135 19.0847C5.52484 18.7572 4.78257 18.2694 4.1586 17.6501L1.59101 15.0751C-0.5069 12.9751 -0.5069 9.3564 1.59101 6.80015C3.75781 4.11265 7.6092 3.41265 10.1455 5.4564L14.8548 9.27515L16.1449 10.3189L19.0882 12.7001L19.8961 13.3564L23.879 16.5814Z" fill="#8331FF"/>
                <path d="M40.0793 6.81261C40.0793 8.95636 38.9772 11.1876 36.754 13.0126L28.9072 19.3751L28.1181 20.0001L24.6487 22.8189L23.3587 23.8626L19.8643 26.6939L16.9084 23.8751L20.5155 20.7501L21.3672 20.0001L24.63 17.1939L25.4253 16.5001L32.721 10.2501C34.5997 8.62511 34.5997 6.23136 32.721 5.00636C31.7364 4.40922 30.5695 4.18519 29.4332 4.37511C28.2758 4.52481 27.1942 5.03177 26.3396 5.82511L19.7766 12.0751L16.8145 9.67511L22.9641 3.50636C26.4398 0.0188582 32.5958 -1.10614 36.7415 1.36886C37.7315 1.89944 38.5623 2.68318 39.1488 3.63976C39.7354 4.59635 40.0565 5.69137 40.0793 6.81261Z" fill="#8331FF"/>
                <path d="M36.755 38.6752C34.5268 39.9079 31.9324 40.3111 29.4342 39.8127C26.9937 39.4047 24.7365 38.262 22.9651 36.5377L16.9469 30.494L16.1453 29.6815L13.3711 26.8752L12.6321 26.1377L11.5299 25.0315C10.8281 24.3288 9.88673 23.9159 8.89346 23.8752C8.43643 23.846 7.97826 23.9109 7.54737 24.0657C7.11647 24.2205 6.72203 24.462 6.38849 24.7752L3.69565 27.3502C3.19411 27.8823 2.91486 28.5853 2.91486 29.3158C2.91486 30.0464 3.19411 30.7494 3.69565 31.2815C4.18617 31.8695 4.878 32.2548 5.637 32.3627C5.99627 32.4162 6.36281 32.3931 6.71252 32.2951C7.06222 32.1971 7.38718 32.0263 7.66603 31.794L12.6384 27.5002L15.4001 30.2752L10.1459 34.5502C9.51509 35.0407 8.78617 35.3905 8.00834 35.576C7.23052 35.7614 6.42188 35.7782 5.637 35.6252C4.02999 35.3241 2.58269 34.4623 1.5539 33.194C-0.544009 30.6377 -0.544009 27.0252 1.5539 24.9252L4.12149 22.3502C4.74785 21.7363 5.49125 21.254 6.30769 20.932C7.12413 20.6099 7.99701 20.4546 8.87467 20.4752C10.8598 20.489 12.7627 21.2683 14.1852 22.6502L15.0306 23.4002L16.1767 24.5002L19.12 27.3002L19.9341 28.1252L26.3531 34.2252C27.2056 35.0111 28.2828 35.5115 29.4342 35.6565C30.5678 35.8495 31.7331 35.6276 32.7157 35.0315C34.5944 33.7815 34.5944 31.4127 32.7157 29.7815L25.3762 23.4502L28.8643 20.6252L36.755 27.0065C41.1888 30.6252 41.1888 36.0315 36.755 38.6752Z" fill="#8331FF"/>
                <path d="M53.4375 32.4313V7.56885H68.9996V11.5813H57.8275V17.9751H67.8473V21.8188H57.8275V28.4188H68.9996V32.4313H53.4375Z" fill="#0B2545"/>
                <path d="M71.3301 32.4313L77.1541 24.2L71.3301 15.625H76.196L79.9534 21.3375L83.5293 15.625H88.2198L82.4647 24.125L88.0508 32.425H83.2537L79.6528 26.875L76.0895 32.4188L71.3301 32.4313Z" fill="#0B2545"/>
                <path d="M90.7246 15.625H94.5948L94.8703 18.175C95.8974 16.2375 98.1268 15.1125 100.694 15.1125C105.46 15.1125 108.61 18.55 108.61 23.8188C108.61 29.0875 105.736 32.8625 100.694 32.8625C98.1894 32.8625 95.9663 31.8813 94.9016 30.1813V40H90.7246V15.625ZM99.6987 29.125C102.648 29.125 104.395 27.0188 104.395 24.025C104.395 21.0313 102.648 18.8875 99.6987 18.8875C96.7491 18.8875 94.9392 21 94.9392 24.025C94.9392 27.05 96.8242 29.1313 99.6987 29.1313V29.125Z" fill="#0B2545"/>
                <path d="M110.939 24.0314C110.939 18.7564 114.403 15.1189 119.369 15.1189C124.441 15.1189 127.666 18.4876 127.666 23.7251V24.9751L114.916 25.0001C115.223 27.9564 116.795 29.4501 119.575 29.4501C121.874 29.4501 123.377 28.5689 123.859 26.9501H127.754C127.04 30.6251 123.953 32.8314 119.531 32.8314C114.471 32.8689 110.939 29.2314 110.939 24.0314ZM115.016 22.3626H123.514C123.514 20.0501 121.905 18.5189 119.406 18.5189C116.908 18.5189 115.43 19.8439 115.016 22.3626Z" fill="#0B2545"/>
                <path d="M141.268 19.4062H139.721C136.709 19.4062 134.824 21.0063 134.824 24.2688V32.4313H130.641V15.6625H134.58L134.824 18.1125C135.214 17.2372 135.863 16.5016 136.683 16.0036C137.503 15.5055 138.456 15.2688 139.414 15.325C140.048 15.3253 140.679 15.4051 141.293 15.5625L141.268 19.4062Z" fill="#0B2545"/>
                <path d="M143.592 10.0002C143.53 6.80015 148.715 6.73765 148.665 10.0002C148.715 13.2939 143.536 13.2252 143.592 10.0002Z" fill="#0B2545"/>
                <path d="M148.22 15.6313H144.037V32.4314H148.22V15.6313Z" fill="#0B2545"/>
                <path d="M151.551 27.6376C151.551 24.5126 153.812 22.6001 157.813 22.2939L162.886 21.9189V21.5501C162.886 19.2689 161.521 18.3501 159.391 18.3501C156.924 18.3501 155.552 19.3689 155.552 21.1376H151.989C151.989 17.5001 155.008 15.1189 159.598 15.1189C164.188 15.1189 166.969 17.5689 166.969 22.2251V32.4314H163.299L162.992 29.9314C162.272 31.6626 159.974 32.8501 157.356 32.8501C153.768 32.8689 151.551 30.7939 151.551 27.6376ZM162.955 25.6251V24.7439L159.423 25.0189C156.817 25.2564 155.828 26.1064 155.828 27.4626C155.828 28.9939 156.855 29.7439 158.74 29.7439C161.308 29.7439 162.955 28.2126 162.955 25.6251Z" fill="#0B2545"/>
              </g>
              <defs>
                <clipPath id="clip0_9637_60191">
                <rect width="167" height="40" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>
          <div class="amount-container">
            <p class="amount">${currency}${numberWithCommas(amount)}</p>
            <p class="amount-paid">Amount paid</p>
          </div>
          </div>
          <div class="sections">
           <div class="dashed-divider" />

            <p class="section-title" style="padding-top: 0px;" >Paid To:</p>
            <p class="section-text">${recipient}</p>

            <div class="divider" />

            <p class="section-title">From:</p>
            <p class="section-text">${sender}</p>

            <div class="divider" />

            <p class="section-title">Description:</p>
            <p class="section-text">${truncate(remark, 100)}</p>

            <div class="divider" />

            <p class="section-title">Reference:</p>
            <p class="section-text">${reference}</p>

            <div class="divider" />

            <p class="section-title">Date:</p>
            <p class="section-text">${new Date(date).toDateString()}</p>
          </div>
      </div>

    </body>
  </html>
  `;

/**
 * generate pdf for ticket details
 *
 * @param {amountPaid, name, email, experienceTitle, bookingId, ticketCode, dateBooked}
 */
export const ticketDetailsPdf = data => `
  <html>
    <head>
      <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      <title>Ticket</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap');
        html {
                height: 100%;
              }
        body {
                margin: 0;
                min-height: 100%;
                overflow-x: hidden;
                font-family: 'Satoshi-Regular', 'DM Sans', sans-serif;
              }
        * {
            box-sizing: border-box;
          }
        h1 {
              margin-top: 0;
              text-align: center;
              font-weight: 700;
              font-family: 'Satoshi-Bold', 'DM Sans', sans-serif;
            }
        p {
            font-family: 'Satoshi-Regular', 'DM Sans', sans-serif;
          }
         .container {
            display: flex;
            flex-direction: column;
            justify-content: center; 
            align-items: center; 
            height: 100%;
          }
          .ticket-container {
            height: 60%;
            max-width: 400px;
            width: 100%;
            border: 1px solid ${colors.gray[100]};
            border-radius: 8px;
            padding: 24px;
          }
          .logo-container {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            width: 100%;
            text-align: center;
          }
          .amount-container {
            align-items: center;
            justify-content: center;
          }
          .amount {
            font-size: 36px;
            font-weight: 700;
            text-align: center;
            line-height: 20px;
          }
          .amount-paid {
            font-size: ${spacing[13]}px;
            font-weight: 400;
            color: ${colors.gray[300]};
            text-align: center;
            margin-top: 40px;
            margin-bottom: -14px;
          }
          .dashed-divider {
            height: 2px;
            width: 100%;
            margin-top: 20px;
            border-top-style: dashed;
            border-top-color: ${colors.gray[100]};
            border-top-width: 2px;
          }
          .divider {
            height: 2px;
            width: 100%;
            background-color: ${colors.gray[100]};
            margin-bottom: 10px;
          }
          .sections {
            margin-top: 10px;
            margin-bottom: 10px;
          }
          .section-title { 
            font-weight: 400;
            color: ${colors.gray[300]};
            font-size: ${spacing[14]}px;
            padding-top: 14px;
          }
          .section-text {
            color: ${colors.base.black};
            font-size: ${spacing[16]}px;
            font-weight: 500;
            margin-top: -10px;
          }
          .last-section{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
      </style>
    </head>
    <body class="container">
      <div class="ticket-container">
        <div class="logo-container">
          <svg width="133" height="32" viewBox="0 0 165 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1186_7721)">
            <path d="M19.0716 13.2407L16.5079 15.4766L13.4095 12.8205L12.9097 12.3854L10.6859 10.4746L9.54145 9.47415L6.14817 6.54293C5.9248 6.35323 5.66321 6.21393 5.38121 6.13451C5.09921 6.0551 4.80343 6.03744 4.514 6.08274C3.91103 6.18179 3.36522 6.49854 2.97978 6.97311C2.57921 7.39979 2.35622 7.96327 2.35622 8.54876C2.35622 9.13426 2.57921 9.69774 2.97978 10.1244L5.12869 12.1753C5.39486 12.4259 5.70962 12.6192 6.05348 12.7431C6.39734 12.867 6.76296 12.9189 7.12768 12.8956C7.92239 12.859 8.67392 12.5231 9.23161 11.9552L10.1611 11.0148L12.365 12.9256L11.3655 13.876C10.2308 14.9833 8.7124 15.6088 7.12768 15.6217C6.42557 15.6346 5.72803 15.5063 5.07645 15.2442C4.42487 14.9821 3.83253 14.5917 3.3346 14.0961L1.28564 12.0352C-0.388508 10.3545 -0.388508 7.45831 1.28564 5.41247C3.01476 3.26157 6.0882 2.70134 8.11218 4.33702L11.8703 7.39329L12.8997 8.22863L15.2486 10.1344L15.8932 10.6596L19.0716 13.2407Z" fill="#8331FF"/>
            <path d="M31.9999 5.42245C31.9999 7.13816 31.1203 8.9239 29.3462 10.3845L23.0844 15.4766L22.4547 15.9768L19.6862 18.2328L18.6567 19.0681L15.8681 21.334L13.5093 19.0781L16.3878 16.5771L17.0675 15.9768L19.6712 13.7309L20.3058 13.1757L26.1279 8.17359C27.6271 6.87305 27.6271 4.95726 26.1279 3.97685C25.3422 3.49894 24.411 3.31964 23.5042 3.47164C22.5806 3.59145 21.7174 3.99719 21.0355 4.63212L15.7981 9.63419L13.4343 7.7134L18.3418 2.77635C21.1154 -0.0148024 26.0279 -0.915175 29.3363 1.06564C30.1263 1.49029 30.7893 2.11754 31.2573 2.88312C31.7254 3.6487 31.9817 4.52508 31.9999 5.42245Z" fill="#8331FF"/>
            <path d="M29.3463 30.923C27.5682 31.9096 25.4979 32.2322 23.5043 31.8333C21.5568 31.5068 19.7555 30.5923 18.3419 29.2122L13.5394 24.3752L12.8997 23.725L10.6858 21.479L10.0961 20.8888L9.21657 20.0034C8.65652 19.4411 7.90527 19.1106 7.11264 19.0781C6.74792 19.0547 6.3823 19.1066 6.03844 19.2305C5.69459 19.3544 5.37982 19.5477 5.11365 19.7983L2.96474 21.8592C2.56451 22.2851 2.34167 22.8477 2.34167 23.4324C2.34167 24.017 2.56451 24.5797 2.96474 25.0055C3.35618 25.4761 3.90827 25.7845 4.51396 25.8709C4.80066 25.9136 5.09316 25.8952 5.37223 25.8168C5.6513 25.7383 5.91062 25.6016 6.13314 25.4157L10.1011 21.9793L12.305 24.2002L8.11213 27.6216C7.60871 28.0142 7.02702 28.2941 6.40631 28.4425C5.78559 28.5909 5.1403 28.6044 4.51396 28.4819C3.23155 28.241 2.07659 27.5512 1.25561 26.5361C-0.418537 24.4903 -0.418537 21.5991 1.25561 19.9184L3.30457 17.8575C3.8044 17.3662 4.39764 16.9802 5.04917 16.7225C5.7007 16.4647 6.39727 16.3404 7.09765 16.3569C8.68178 16.3679 10.2003 16.9917 11.3355 18.0976L12.0101 18.6979L12.9247 19.5783L15.2735 21.8192L15.9232 22.4795L21.0456 27.3615C21.7258 27.9905 22.5855 28.391 23.5043 28.507C24.4089 28.6615 25.3388 28.4839 26.123 28.0068C27.6222 27.0063 27.6222 25.1106 26.123 23.805L20.266 18.7379L23.0495 16.477L29.3463 21.5841C32.8845 24.4803 32.8845 28.8071 29.3463 30.923Z" fill="#8331FF"/>
            <path d="M42 26.9795H55.1471V24.0345H45.7685V18.1726H52.9087V15.3679H45.7685V9.87055H54.6654V6.92557H42V26.9795Z" fill="#23262F"/>
            <path d="M56.9567 26.9795H60.5268L64.0686 21.6785L67.5254 26.9795H71.5205L66.222 19.2104L71.0105 12.3107H67.412L64.3519 17.0507L61.2635 12.3107H57.2967L62.1135 19.4628L56.9567 26.9795Z" fill="#23262F"/>
            <path d="M74.1461 32H77.5745V24.6796C78.3679 26.11 80.0679 27.26 82.4197 27.26C86.2448 27.26 88.9932 24.3991 88.9932 19.6872V19.4628C88.9932 14.7228 86.1314 12.0022 82.4197 12.0022C80.2379 12.0022 78.3962 13.2643 77.5745 14.6667V12.3107H74.1461V32ZM81.5696 24.5674C79.0762 24.5674 77.4612 23.0248 77.4612 19.7433V19.5189C77.4612 16.2654 79.1612 14.6667 81.5413 14.6667C83.7797 14.6667 85.4797 16.2654 85.4797 19.5189V19.7433C85.4797 22.8846 84.0914 24.5674 81.5696 24.5674Z" fill="#23262F"/>
            <path d="M92.1613 26.9795H95.5898V12.3107H92.1613V26.9795ZM93.833 9.8986C94.9664 9.8986 95.8731 9.05717 95.8731 7.96332C95.8731 6.84142 94.9664 6 93.833 6C92.6997 6 91.793 6.84142 91.793 7.96332C91.793 9.05717 92.6997 9.8986 93.833 9.8986Z" fill="#23262F"/>
            <path d="M104.812 27.2319C105.86 27.2319 106.597 27.0636 107.136 26.8673V24.1748C106.654 24.3711 106.144 24.4552 105.464 24.4552C104.387 24.4552 103.764 23.8662 103.764 22.576V14.863H107.022V12.3107H103.764V9.08522H100.335V12.3107H98.3519V14.863H100.335V22.8846C100.335 25.6613 101.865 27.2319 104.812 27.2319Z" fill="#23262F"/>
            <path d="M110.228 26.9795H113.656V19.3506C113.656 16.2373 116.497 15.5081 119.5 15.48V12.3107C116 12.0022 114.5 13 113.656 15.0593V12.3107H110.228V26.9795Z" fill="#23262F"/>
            <path d="M125.095 27.26C127.361 27.26 128.665 26.4466 129.628 25.1845V26.9795H133V17.3592C133 13.3484 130.393 12.0022 127.078 12.0022C123.763 12.0022 121.015 13.4326 120.731 16.8544H124.046C124.216 15.3959 125.095 14.5545 126.88 14.5545C128.892 14.5545 129.572 15.5361 129.572 17.4995V18.2567H127.73C123.48 18.2567 120.136 19.4908 120.136 22.9126C120.136 25.9698 122.375 27.26 125.095 27.26ZM125.916 24.8198C124.216 24.8198 123.536 24.0065 123.536 22.7724C123.536 20.9773 125.208 20.3883 127.815 20.3883H129.572V21.8468C129.572 23.726 128.013 24.8198 125.916 24.8198Z" fill="#23262F"/>
            </g>
            <path d="M141.808 20.8381L141.903 19.502C142.361 20.5142 143.263 21 144.355 21C146.254 21 147.386 19.5425 147.386 17.5857C147.386 15.6154 146.281 14.1309 144.381 14.1309C143.277 14.1309 142.388 14.6167 141.93 15.5749V11H141V20.8381H141.808ZM141.943 17.5587C141.943 16.0607 142.778 14.9676 144.206 14.9676C145.621 14.9676 146.443 16.0607 146.443 17.5587C146.443 19.0702 145.621 20.1498 144.206 20.1498C142.778 20.1498 141.943 19.0702 141.943 17.5587Z" fill="#3F3F3F"/>
            <path d="M151.602 21C153.138 21 154.149 20.2578 154.499 18.8812H153.61C153.367 19.7449 152.68 20.2038 151.616 20.2038C150.215 20.2038 149.379 19.2861 149.312 17.6937H154.499V17.2348C154.499 15.386 153.3 14.1309 151.535 14.1309C149.676 14.1309 148.409 15.5344 148.409 17.5722C148.409 19.6235 149.689 21 151.602 21ZM151.535 14.9271C152.761 14.9271 153.569 15.7638 153.569 17.0189H149.339C149.501 15.7368 150.309 14.9271 151.535 14.9271Z" fill="#3F3F3F"/>
            <path d="M157.415 20.8381V15.0891H158.721V14.3063H157.415V12.2416H156.499V14.3063H155.192V15.0891H156.499V20.8381H157.415Z" fill="#3F3F3F"/>
            <path d="M161.699 21C162.804 21 163.693 20.5142 164.097 19.691L164.219 20.8381H165V16.614C165 14.8866 163.895 14.1309 162.386 14.1309C160.783 14.1309 159.705 14.9811 159.705 16.3036H160.554C160.554 15.4265 161.228 14.9136 162.359 14.9136C163.316 14.9136 164.084 15.3185 164.084 16.6005V16.8165L161.928 16.9919C160.406 17.1134 159.49 17.8691 159.49 19.0702C159.49 20.2173 160.312 21 161.699 21ZM161.915 20.2443C161.026 20.2443 160.433 19.8394 160.433 19.0432C160.433 18.3144 160.931 17.7746 162.157 17.6667L164.084 17.5182V17.8691C164.084 19.2861 163.289 20.2443 161.915 20.2443Z" fill="#3F3F3F"/>
            <defs>
            <clipPath id="clip0_1186_7721">
            <rect width="133" height="32" fill="white"/>
            </clipPath>
            </defs>
          </svg>
        </div>
        <div class="amount-container">
          <p class="amount-paid">Amount paid</p>
          <p class="amount">
            ${resolvePrice(data.booking.currency, data.booking.pricePerTicket)}
          </p>
        </div>
        <div class="sections">
          <div class="dashed-divider" />

          <p class="section-title" style="padding-top: 0px;" >Full name:</p>
          <p class="section-text">${data.fullName}</p>

          <div class="divider" />

          <p class="section-title">Email:</p>
          <p class="section-text">${data.email}</p>

          <div class="divider" />

          <p class="section-title">Experience:</p>
          <p class="section-text">${data.experience.title}</p>

          <div class="divider" />

          <p class="section-title">Booking ID:</p>
          <p class="section-text">${data.fullName}</p>

          <div class="divider" />

          <div class="last-section">
            <div>
              <p class="section-title" style="padding-top: 0px;">Ticket code:</p>
              <p class="section-text">${data.code}</p>
            </div>
            <div>
              <p class="section-title" style="padding-top: 0px;">Date Booked:</p>
              <p class="section-text">${moment(data.createdAt).format('ll')}</p>
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>
  `;
