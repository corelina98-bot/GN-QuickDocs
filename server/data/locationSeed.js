import { colomboDivisions } from "./colomboDivisions.js";

export const locations = [
  {
    name: { en: "Western", si: "බස්නාහිර", ta: "மேற்கு" },
    districts: [
      { name: { en: "Colombo", si: "කොළඹ", ta: "கொழும்பு" }, divisions: colomboDivisions },
      { name: { en: "Gampaha", si: "ගම්පහ", ta: "கம்பஹா" }, divisions: [] },
      { name: { en: "Kalutara", si: "කළුතර", ta: "களுத்துறை" }, divisions: [] },
    ],
  },
  {
    name: { en: "Central", si: "මධ්‍යම", ta: "மத்திய" },
    districts: [
      { name: { en: "Kandy", si: "මහනුවර", ta: "கண்டி" }, divisions: [] },
      { name: { en: "Matale", si: "මාතලේ", ta: "மாத்தளை" }, divisions: [] },
      { name: { en: "Nuwara Eliya", si: "නුවරඑළිය", ta: "நுவரெலியா" }, divisions: [] },
    ],
  },
  {
    name: { en: "Southern", si: "දකුණු", ta: "தெற்கு" },
    districts: [
      { name: { en: "Galle", si: "ගාල්ල", ta: "காலி" }, divisions: [] },
      { name: { en: "Matara", si: "මාතර", ta: "மாத்தறை" }, divisions: [] },
      { name: { en: "Hambantota", si: "හම්බන්තොට", ta: "அம்பாந்தோட்டை" }, divisions: [] },
    ],
  },
  {
    name: { en: "Northern", si: "උතුරු", ta: "வடக்கு" },
    districts: [
      { name: { en: "Jaffna", si: "යාපනය", ta: "யாழ்ப்பாணம்" }, divisions: [] },
      { name: { en: "Kilinochchi", si: "කිලිනොච්චිය", ta: "கிளிநொச்சி" }, divisions: [] },
      { name: { en: "Mannar", si: "මන්නාරම", ta: "மன்னார்" }, divisions: [] },
      { name: { en: "Mullaitivu", si: "මුලතිව්", ta: "முல்லைத்தீவு" }, divisions: [] },
      { name: { en: "Vavuniya", si: "වවුනියාව", ta: "வவுனியா" }, divisions: [] },
    ],
  },
  {
    name: { en: "Eastern", si: "නැගෙනහිර", ta: "கிழக்கு" },
    districts: [
      { name: { en: "Trincomalee", si: "ත්‍රිකුණාමලය", ta: "திருகோணமலை" }, divisions: [] },
      { name: { en: "Batticaloa", si: "මඩකලපුව", ta: "மட்டக்களப்பு" }, divisions: [] },
      { name: { en: "Ampara", si: "අම්පාර", ta: "அம்பாறை" }, divisions: [] },
    ],
  },
  {
    name: { en: "North Western", si: "වයඹ", ta: "வடமேற்கு" },
    districts: [
      { name: { en: "Kurunegala", si: "කුරුණෑගල", ta: "குருணாகல்" }, divisions: [] },
      { name: { en: "Puttalam", si: "පුත්තලම", ta: "புத்தளம்" }, divisions: [] },
    ],
  },
  {
    name: { en: "North Central", si: "උතුරු මැද", ta: "வடமத்திய" },
    districts: [
      { name: { en: "Anuradhapura", si: "අනුරාධපුර", ta: "அனுராதபுரம்" }, divisions: [] },
      { name: { en: "Polonnaruwa", si: "පොළොන්නරුව", ta: "பொலன்னறுவை" }, divisions: [] },
    ],
  },
  {
    name: { en: "Uva", si: "ඌව", ta: "ஊவா" },
    districts: [
      { name: { en: "Badulla", si: "බදුල්ල", ta: "பதுளை" }, divisions: [] },
      { name: { en: "Monaragala", si: "මොණරාගල", ta: "மொனராகலை" }, divisions: [] },
    ],
  },
  {
    name: { en: "Sabaragamuwa", si: "සබරගමුව", ta: "சப்ரகமுவ" },
    districts: [
      { name: { en: "Ratnapura", si: "රත්නපුර", ta: "இரத்தினபுரி" }, divisions: [] },
      { name: { en: "Kegalle", si: "කෑගල්ල", ta: "கேகாலை" }, divisions: [] },
    ],
  },
];
