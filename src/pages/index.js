/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp();
}

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.generateQuizFromResume = functions.https.onCall(async (data, context) => {
  const fileUrl = data.fileUrl;
  
  // Mocking AI processing of the resume file to generate a customized quiz
  return {
    quiz: [
      {
        question: "Based on the frontend technologies listed in your resume, what is a key advantage of using React?",
        options: ["Virtual DOM for performance", "Built-in database", "It is a strictly typed language", "Replaces the need for CSS"],
        answer: "Virtual DOM for performance"
      },
      {
        question: "You mentioned experience with backend development. How does Node.js handle concurrency?",
        options: ["Multi-threading", "Event Loop", "Parallel processing", "It doesn't handle concurrency"],
        answer: "Event Loop"
      },
      {
        question: "Regarding your cloud deployment experience, what does CI/CD stand for?",
        options: ["Continuous Integration / Continuous Deployment", "Cloud Infrastructure / Cloud Deployment", "Code Inspection / Code Delivery", "Compute Instance / Core Data"],
        answer: "Continuous Integration / Continuous Deployment"
      }
    ]
  };
});
