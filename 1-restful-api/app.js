// A RESTful API for an uptime monitor
//
// Users enter URL they want to monitor
// and receives SMS (Twilio) alert when those resources go down or come back up
//
// Included features: sign-up, sign-in, sign-out, edit settings
//
// REQUIREMENTS:
// 1. Listens on PORT, accepts incoming HTTP requests for POST, GET, PUT, DELETE and HEAD
// 2. Allows a client to connect, create new user, edit or delete users
// 3. Users can sign-in, which returns a token for subsequent authenticated requests
// 4. Users can sign-out, invalidates token
// 5. Signed-in user can use token to create a "check" (a URL up or down (custom up and down def))
// 6. Signed-in user can edit or delete checks (limited 5 checks)
// 7. Checks run at appropriate times (every minute), alert user if state changes
//
// In a real production program, you should use DB rather than JSON files
