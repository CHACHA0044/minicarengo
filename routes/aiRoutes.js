const router = require("express").Router();

/* AI SUMMARY */
router.post("/summarize", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Text required" });
  }

  const msg = text.toLowerCase();

  let result = "General health concern detected";

  // Fever-related variations
  if (
    (msg.includes("fever") || msg.includes("temperature") || msg.includes("hot") || msg.includes("burning up")) &&
    (msg.includes("headache") || msg.includes("head pain") || msg.includes("migraine"))
  ) {
    const variations = [
      "Possible viral infection with fever and headache symptoms",
      "Fever combined with headache - may indicate viral illness",
      "Elevated temperature with head pain - potential infection detected",
      "Symptoms suggest possible flu or viral fever with headache"
    ];
    result = variations[Math.floor(Math.random() * variations.length)];
  }

  // Stomach and digestive issues
  else if (
    msg.includes("stomach") ||
    msg.includes("vomit") ||
    msg.includes("nausea") ||
    msg.includes("throw up") ||
    msg.includes("belly") ||
    msg.includes("abdomen") ||
    msg.includes("diarrhea") ||
    msg.includes("loose motion")
  ) {
    const variations = [
      "Possible stomach infection or food poisoning detected",
      "Gastrointestinal distress - may indicate food-borne illness",
      "Digestive system issue - possible gastroenteritis or food poisoning",
      "Stomach-related symptoms suggesting potential infection",
      "Abdominal discomfort - could be digestive infection or food intolerance"
    ];
    result = variations[Math.floor(Math.random() * variations.length)];
  }

  // Chest pain variations
  else if (
    msg.includes("chest pain") ||
    msg.includes("chest hurt") ||
    msg.includes("heart pain") ||
    msg.includes("chest pressure") ||
    msg.includes("chest tight")
  ) {
    const variations = [
      "Chest discomfort detected – immediate medical check strongly recommended",
      "Chest pain reported - please seek medical attention promptly",
      "Cardiac-area discomfort - medical evaluation advised urgently",
      "Chest pressure or pain - professional medical assessment needed"
    ];
    result = variations[Math.floor(Math.random() * variations.length)];
  }

  // Respiratory issues
  else if (
    msg.includes("cough") ||
    msg.includes("cold") ||
    msg.includes("sneeze") ||
    msg.includes("runny nose") ||
    msg.includes("sore throat") ||
    msg.includes("throat pain") ||
    msg.includes("congestion") ||
    msg.includes("breathing")
  ) {
    const variations = [
      "Respiratory issue detected - possible cold or upper respiratory infection",
      "Cold or cough symptoms - may indicate respiratory tract infection",
      "Upper respiratory symptoms - potential viral cold or flu",
      "Breathing-related concern - possible respiratory infection",
      "Throat and respiratory symptoms - could be viral infection"
    ];
    result = variations[Math.floor(Math.random() * variations.length)];
  }

  // Body aches and pain
  else if (
    msg.includes("body ache") ||
    msg.includes("muscle pain") ||
    msg.includes("joint pain") ||
    msg.includes("back pain") ||
    msg.includes("weakness") ||
    msg.includes("fatigue") ||
    msg.includes("tired")
  ) {
    const variations = [
      "Generalized body pain and fatigue - may indicate viral illness",
      "Muscle aches and weakness detected - possible flu-like symptoms",
      "Body pain and fatigue - could suggest systemic infection",
      "Musculoskeletal discomfort - potential viral or inflammatory condition"
    ];
    result = variations[Math.floor(Math.random() * variations.length)];
  }

  // Skin conditions
  else if (
    msg.includes("rash") ||
    msg.includes("itching") ||
    msg.includes("skin") ||
    msg.includes("allergy") ||
    msg.includes("red") ||
    msg.includes("swelling")
  ) {
    const variations = [
      "Skin-related symptoms - possible allergic reaction or dermatitis",
      "Rash or itching detected - may indicate allergic response",
      "Dermatological concern - could be allergy or skin infection",
      "Skin irritation symptoms - potential allergic or inflammatory reaction"
    ];
    result = variations[Math.floor(Math.random() * variations.length)];
  }

  // Dizziness and neurological
  else if (
    msg.includes("dizzy") ||
    msg.includes("vertigo") ||
    msg.includes("lightheaded") ||
    msg.includes("faint") ||
    msg.includes("balance")
  ) {
    const variations = [
      "Dizziness reported - may indicate dehydration or inner ear issue",
      "Balance or vertigo symptoms - medical evaluation recommended",
      "Lightheadedness detected - could be circulation or hydration issue",
      "Dizzy spells - potential vestibular or cardiovascular concern"
    ];
    result = variations[Math.floor(Math.random() * variations.length)];
  }

  // General variations for default case
  else {
    const generalVariations = [
      "General health concern detected - please provide more details",
      "Health symptom reported - additional information needed for assessment",
      "Medical concern noted - further details would help clarify",
      "Health-related inquiry - more specific symptoms would be helpful"
    ];
    result = generalVariations[Math.floor(Math.random() * generalVariations.length)];
  }

  res.json({
    success: true,
    summary: result
  });
});

/* CHATBOT */
router.post("/chat", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: "Message required" });
  }

  const msg = message.toLowerCase();

  let reply = "I'm here to help. Can you explain your symptoms in more detail?";

  // Fever responses
  if (
    msg.includes("fever") ||
    msg.includes("temperature") ||
    msg.includes("hot") ||
    msg.includes("burning up") ||
    msg.includes("chills")
  ) {
    const replies = [
      "For fever, drink plenty of fluids, rest well, and monitor your temperature regularly. If it persists beyond 3 days or exceeds 103°F, consult a doctor.",
      "Stay hydrated with water and ORS, get adequate rest, and keep track of your temperature. Seek medical help if fever is very high or prolonged.",
      "Rest is crucial. Drink fluids every hour, wear light clothing, and use a cool compress if needed. Monitor temperature and consult a doctor if it worsens.",
      "Keep yourself hydrated, avoid heavy activities, and rest in a cool environment. If fever continues for more than 2-3 days, medical attention is advised.",
      "Maintain fluid intake, rest adequately, and track your temperature twice daily. High fever (above 103°F) or persistent fever needs medical evaluation."
    ];
    reply = replies[Math.floor(Math.random() * replies.length)];
  }

  // Headache responses
  else if (
    msg.includes("headache") ||
    msg.includes("head pain") ||
    msg.includes("migraine") ||
    msg.includes("head hurt")
  ) {
    const replies = [
      "Try resting in a dark, quiet room. Avoid screens and bright lights. Stay hydrated and consider a cool compress on your forehead.",
      "Rest is important. Stay hydrated, reduce screen time, and try to relax. If headaches are frequent or severe, consult a healthcare provider.",
      "Reduce eye strain by limiting screen exposure. Drink water, rest well, and avoid loud noises. Persistent headaches should be evaluated by a doctor.",
      "Stay in a calm environment, drink plenty of water, and avoid caffeine or alcohol. Rest with minimal stimulation. Seek help if pain is severe.",
      "Hydration is key. Rest your eyes, avoid bright lights, and try gentle neck stretches. If headache persists or worsens, medical advice is recommended."
    ];
    reply = replies[Math.floor(Math.random() * replies.length)];
  }

  // Stomach and vomiting responses
  else if (
    msg.includes("vomit") ||
    msg.includes("nausea") ||
    msg.includes("throw up") ||
    msg.includes("stomach") ||
    msg.includes("belly") ||
    msg.includes("abdomen")
  ) {
    const replies = [
      "Sip ORS or clear fluids slowly. Avoid solid, oily, or spicy foods. Rest and let your stomach settle. If vomiting persists, see a doctor.",
      "Stay hydrated with small sips of water or electrolyte solution. Eat bland foods like crackers or toast when ready. Avoid dairy and fried items.",
      "Rest your digestive system. Drink fluids in small amounts frequently. Avoid heavy meals. If symptoms continue beyond 24 hours, seek medical help.",
      "Keep hydrated with ORS or coconut water. Stick to light foods like rice or bananas. Rest and avoid triggers. Persistent symptoms need medical attention.",
      "Sip water or ginger tea slowly. Avoid eating for a few hours, then try bland foods. Rest well. Consult a doctor if dehydration or severe pain occurs."
    ];
    reply = replies[Math.floor(Math.random() * replies.length)];
  }

  // Diarrhea responses
  else if (
    msg.includes("diarrhea") ||
    msg.includes("loose motion") ||
    msg.includes("loose stool")
  ) {
    const replies = [
      "Drink plenty of ORS to prevent dehydration. Eat bland foods like rice, bananas, and toast. Avoid dairy and spicy foods. See a doctor if it persists.",
      "Stay well hydrated with electrolyte solutions. Stick to simple, easy-to-digest foods. Avoid caffeine and alcohol. Seek help if symptoms worsen.",
      "Rehydration is critical. Drink water with oral rehydration salts. Eat small, frequent bland meals. If blood appears or fever develops, consult a doctor.",
      "Keep drinking fluids throughout the day. Follow the BRAT diet (bananas, rice, applesauce, toast). Rest and avoid irritating foods. Medical help if severe."
    ];
    reply = replies[Math.floor(Math.random() * replies.length)];
  }

  // Cough and cold responses
  else if (
    msg.includes("cough") ||
    msg.includes("cold") ||
    msg.includes("sneeze") ||
    msg.includes("runny nose") ||
    msg.includes("congestion")
  ) {
    const replies = [
      "Stay warm and hydrated. Try steam inhalation and warm fluids like soup or tea. Rest well. If cough persists beyond a week, consult a doctor.",
      "Drink warm water, herbal teas, or honey with warm water. Use a humidifier if possible. Avoid cold drinks and rest your voice if coughing.",
      "Rest is essential for recovery. Stay hydrated and try ginger or honey tea. Steam inhalation can help. Seek medical advice if breathing becomes difficult.",
      "Keep warm, drink fluids, and get plenty of sleep. Gargle with salt water for throat relief. Avoid smoking or polluted air. See a doctor if symptoms worsen.",
      "Hydrate well with warm beverages. Rest in a comfortable position. Try honey and warm water. If cough is persistent or accompanied by fever, get checked."
    ];
    reply = replies[Math.floor(Math.random() * replies.length)];
  }

  // Sore throat responses
  else if (
    msg.includes("sore throat") ||
    msg.includes("throat pain") ||
    msg.includes("throat hurt")
  ) {
    const replies = [
      "Gargle with warm salt water several times a day. Drink warm fluids and avoid cold items. Rest your voice and stay hydrated.",
      "Try honey with warm water or herbal tea. Gargle with salt water. Avoid shouting or straining your voice. If pain is severe, see a doctor.",
      "Stay hydrated and sip warm liquids. Salt water gargles help reduce inflammation. Avoid spicy or acidic foods. Persistent pain needs evaluation.",
      "Warm fluids and throat lozenges can provide relief. Gargle regularly with salt water. Rest and avoid irritants like smoke. Consult if it worsens."
    ];
    reply = replies[Math.floor(Math.random() * replies.length)];
  }

  // Body ache responses
  else if (
    msg.includes("body ache") ||
    msg.includes("muscle pain") ||
    msg.includes("weakness") ||
    msg.includes("fatigue") ||
    msg.includes("tired")
  ) {
    const replies = [
      "Rest is crucial. Stay hydrated and eat nutritious meals. Gentle stretching may help. If pain persists or is severe, consult a healthcare provider.",
      "Get adequate sleep and drink plenty of fluids. Avoid strenuous activities. Warm compresses can ease muscle pain. Seek help if symptoms don't improve.",
      "Prioritize rest and hydration. Light exercise like walking may help if tolerable. Eat well-balanced meals. Persistent fatigue should be evaluated.",
      "Rest your body and avoid overexertion. Stay hydrated and maintain good nutrition. If weakness continues or worsens, medical attention is needed."
    ];
    reply = replies[Math.floor(Math.random() * replies.length)];
  }

  // Chest pain responses
  else if (
    msg.includes("chest pain") ||
    msg.includes("chest hurt") ||
    msg.includes("heart pain") ||
    msg.includes("chest pressure")
  ) {
    const replies = [
      "Chest pain can be serious. Please seek immediate medical attention or visit the nearest emergency room right away.",
      "This symptom requires urgent evaluation. Do not delay - please contact emergency services or go to a hospital immediately.",
      "Chest discomfort should not be ignored. Please seek immediate medical help. Call emergency services if pain is severe or accompanied by other symptoms.",
      "This is a potentially serious symptom. Please visit a doctor or emergency room immediately for proper evaluation and care."
    ];
    reply = replies[Math.floor(Math.random() * replies.length)];
  }

  // Medicine and medication queries
  else if (
    msg.includes("medicine") ||
    msg.includes("medication") ||
    msg.includes("tablet") ||
    msg.includes("pill") ||
    msg.includes("drug") ||
    msg.includes("painkiller")
  ) {
    const replies = [
      "Please avoid self-medication as it can be harmful. Consult a qualified doctor for proper diagnosis and prescription.",
      "Self-medicating can lead to complications. It's important to see a healthcare professional for appropriate treatment.",
      "Every person's health needs are different. Please consult a doctor who can evaluate your condition and prescribe safely.",
      "Medications should be taken only under medical supervision. Please visit a doctor for proper assessment and prescription.",
      "Avoid taking medicines without professional advice. Consult a healthcare provider for safe and effective treatment options."
    ];
    reply = replies[Math.floor(Math.random() * replies.length)];
  }

  // Emergency or serious symptoms
  else if (
    msg.includes("emergency") ||
    msg.includes("serious") ||
    msg.includes("severe") ||
    msg.includes("bleeding") ||
    msg.includes("unconscious") ||
    msg.includes("can't breathe") ||
    msg.includes("difficulty breathing")
  ) {
    const replies = [
      "This sounds urgent. Please seek immediate medical attention. Call emergency services or go to the nearest hospital right away.",
      "This requires immediate care. Do not wait - please contact emergency services or visit an emergency room immediately.",
      "Please seek urgent medical help. Contact emergency services or go to the nearest hospital without delay.",
      "This is a medical emergency. Please call emergency services immediately or have someone take you to the hospital right now."
    ];
    reply = replies[Math.floor(Math.random() * replies.length)];
  }

  // Allergy and skin issues
  else if (
    msg.includes("rash") ||
    msg.includes("itching") ||
    msg.includes("allergy") ||
    msg.includes("skin") ||
    msg.includes("swelling")
  ) {
    const replies = [
      "Avoid scratching the affected area. Keep it clean and dry. Identify and avoid potential allergens. If severe or spreading, consult a doctor.",
      "Try to keep the area clean. Avoid known allergens and irritants. Cool compresses may help. Seek medical advice if symptoms persist or worsen.",
      "Don't scratch as it can worsen the condition. Stay cool and avoid tight clothing. If swelling or rash spreads rapidly, get medical help.",
      "Maintain good hygiene of the affected area. Avoid potential triggers. If accompanied by breathing difficulty or severe swelling, seek immediate help."
    ];
    reply = replies[Math.floor(Math.random() * replies.length)];
  }

  // Dizziness responses
  else if (
    msg.includes("dizzy") ||
    msg.includes("vertigo") ||
    msg.includes("lightheaded") ||
    msg.includes("faint")
  ) {
    const replies = [
      "Sit or lie down immediately. Stay hydrated and avoid sudden movements. If dizziness persists or is severe, consult a doctor.",
      "Rest in a safe position. Drink water slowly. Avoid standing up quickly. If symptoms continue or worsen, seek medical evaluation.",
      "Find a safe place to sit or lie down. Hydrate well. Avoid driving or operating machinery. Persistent dizziness needs medical attention.",
      "Stay seated and keep your head still. Drink fluids. If accompanied by chest pain, confusion, or vision changes, seek immediate help."
    ];
    reply = replies[Math.floor(Math.random() * replies.length)];
  }

  // General health advice
  else if (
    msg.includes("health") ||
    msg.includes("advice") ||
    msg.includes("tip") ||
    msg.includes("wellness")
  ) {
    const replies = [
      "Maintain a balanced diet, exercise regularly, get 7-8 hours of sleep, and stay hydrated. Regular check-ups are important for preventive care.",
      "Focus on nutritious meals, regular physical activity, adequate sleep, and stress management. Don't skip routine health screenings.",
      "Eat a variety of healthy foods, stay active, prioritize sleep, and manage stress. Regular medical check-ups help catch issues early.",
      "Good health includes proper nutrition, regular exercise, sufficient rest, and mental well-being. Consult healthcare providers for personalized advice."
    ];
    reply = replies[Math.floor(Math.random() * replies.length)];
  }

  // Greetings and general queries
  else if (
    msg.includes("hello") ||
    msg.includes("hi") ||
    msg.includes("hey") ||
    msg.includes("help")
  ) {
    const replies = [
      "Hello! I'm here to provide general health guidance. Please describe your symptoms and I'll do my best to help.",
      "Hi there! How can I assist you with your health concerns today? Please share your symptoms.",
      "Hey! I'm here to help with health-related questions. What symptoms are you experiencing?",
      "Hello! Feel free to describe any health concerns you have, and I'll provide general guidance."
    ];
    reply = replies[Math.floor(Math.random() * replies.length)];
  }

  // Default response variations
  else {
    const defaultReplies = [
      "I'm here to help with your health concerns. Could you provide more details about your symptoms?",
      "To assist you better, please describe your symptoms in more detail. What are you experiencing?",
      "I'd like to help. Can you explain more about what you're feeling? What symptoms do you have?",
      "Please share more information about your condition so I can provide appropriate guidance.",
      "Could you elaborate on your symptoms? The more details you provide, the better I can assist you."
    ];
    reply = defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
  }

  res.json({
    success: true,
    reply
  });
});

module.exports = router;