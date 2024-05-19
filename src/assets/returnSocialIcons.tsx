import instagram from "./socialicons/instagram.png";
import appstore from "./socialicons/appstore.png";
import applemusic from "./socialicons/applemusic.png";
import email from "./socialicons/email.png";
import facebook from "./socialicons/facebook.png";
import gmail from "./socialicons/gmail.png";
import linkedin from "./socialicons/linkedin.png";
import paypal from "./socialicons/paypal.png";
import phone from "./socialicons/phone.png";
import pinterest from "./socialicons/pinterest.png";
import playstore from "./socialicons/playstore.png";
import skype from "./socialicons/skype.png";
import snapchat from "./socialicons/snapchat.png";
import soundcloud from "./socialicons/soundcloud.png";
import spotify from "./socialicons/spotify.png";
import tiktok from "./socialicons/tiktok.png";
import website from "./socialicons/website.png";
import whatsapp from "./socialicons/whatsapp.png";
import youtube from "./socialicons/youtube.png";
import x from "./socialicons/x.png";

import q1 from "./qrOptions/q1.png";
import q2 from "./qrOptions/q2.png";
import q3 from "./qrOptions/q3.png";
import q4 from "./qrOptions/q4.png";
import q5 from "./qrOptions/q5.png";
import q6 from "./qrOptions/q6.png";
import q7 from "./qrOptions/q7.png";
import q8 from "./qrOptions/q8.png";
import q9 from "./qrOptions/q9.png";
import q10 from "./qrOptions/q10.png";
// import q11 from "./qrOptions/q11.png";
import q12 from "./qrOptions/q12.png";
import q13 from "./qrOptions/q13.png";
// import q14 from "./qrOptions/q14.png";
import q15 from "./qrOptions/q15.png";
// import q16 from "./qrOptions/q16.png";
import q17 from "./qrOptions/q17.png";
import q18 from "./qrOptions/q18.png";
import q19 from "./qrOptions/q19.png";
import q20 from "./qrOptions/q20.png";
import q21 from "./qrOptions/q21.png";
import q22 from "./qrOptions/q22.png";
import q23 from "./qrOptions/q23.png";
import q24 from "./qrOptions/q24.png";

export const iconsData: { id: number; name: string; img: string }[] = [
  { id: 1, name: "Instagram", img: instagram },
  { id: 2, name: "App Store", img: appstore },
  { id: 3, name: "Apple Music", img: applemusic },
  { id: 4, name: "Email", img: email },
  { id: 5, name: "Facebook", img: facebook },
  { id: 6, name: "Gmail", img: gmail },
  { id: 7, name: "LinkedIn", img: linkedin },
  { id: 8, name: "PayPal", img: paypal },
  { id: 9, name: "Phone", img: phone },
  { id: 10, name: "Pinterest", img: pinterest },
  { id: 11, name: "Play Store", img: playstore },
  { id: 12, name: "Skype", img: skype },
  { id: 13, name: "Snapchat", img: snapchat },
  { id: 14, name: "SoundCloud", img: soundcloud },
  { id: 15, name: "Spotify", img: spotify },
  { id: 16, name: "TikTok", img: tiktok },
  { id: 17, name: "Website", img: website },
  { id: 18, name: "WhatsApp", img: whatsapp },
  { id: 19, name: "YouTube", img: youtube },
  { id: 20, name: "X", img: x },
];

export const bodyShape: { id: number; img: string; bShape: string }[] = [
  { id: 1, img: q1, bShape: "squares" },
  { id: 2, img: q2, bShape: "dots" },
  // Note: You had a typo here, it should be q21 for the 21st element
];

export const iFrameShape: {
  id: number;
  img: string;
  fShape: number[];
}[] = [
  { id: 3, img: q3, fShape: [0, 0, 0, 0] },
  { id: 4, img: q4, fShape: [0, 100, 0, 0] },
  { id: 5, img: q5, fShape: [0, 0, 0, 100] },
  { id: 6, img: q6, fShape: [0, 0, 100, 0] },
  { id: 7, img: q7, fShape: [100, 0, 100, 0] },
  { id: 8, img: q8, fShape: [0, 100, 0, 100] },
  { id: 9, img: q9, fShape: [100, 0, 100, 100] },
  { id: 10, img: q10, fShape: [0, 100, 100, 100] },
  { id: 23, img: q23, fShape: [100, 100, 100, 100] },
];

export const iShape: {
  id: number;
  img: string;
  iShape: number[];
}[] = [
  { id: 24, img: q24, iShape: [0, 0, 0, 0] },
  { id: 12, img: q12, iShape: [100, 0, 0, 0] },
  { id: 13, img: q13, iShape: [0, 0, 0, 100] },
  // { id: 14, img: q14 },
  { id: 15, img: q15, iShape: [0, 0, 100, 0] },
  // { id: 16, img: q16 },
  { id: 17, img: q17, iShape: [100, 0, 100, 0] },
  { id: 18, img: q18, iShape: [0, 100, 0, 100] },
  { id: 19, img: q19, iShape: [100, 0, 100, 100] },
  { id: 20, img: q20, iShape: [0, 100, 100, 100] },
  { id: 21, img: q21, iShape: [0, 0, 100, 100] },
  { id: 22, img: q22, iShape: [100, 100, 100, 100] },
];
