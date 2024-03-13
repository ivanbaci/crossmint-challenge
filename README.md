# Crossmint Challenge

## Steps to run the project

### Prerequisites

- Install Node.js version 20.11.0

### Setup

1. Environment variables

- Create a `.env` file in the project's root directory.
- Follow the format provided in the .env.example file.

### Run the project

1. Install dependencies

```
npm install
```

2. Build the project

```
npm run build
```

3. Start application

```
npm run start
```

4. Execution check
   - To check if application is working correctly, the user could check the map on Crossmint page. Additionally, the terminal will display some logs that describe the process.

### Run tests

The tests are some unit tests. There are two classes with missing tests that should be tested also. It would be nice to include some e2e tests also.

```
npm test
```

### Solution

#### Key points

- **Non-Blocking concurrency**: the application leverages Node.js's event-driven architecture to manage multiple API calls concurrently without blocking the main thread. This ensures that the application can process a high volume of operations with minimal delay.
- **Retries and backoff**: to ensure reliability, the application implements a retry mechanism with exponential backoff. If an API request fails due to server errors or rate limiting, the system will automatically retry the request after a calculated delay, increasing the delay with each subsequent retry up to a maximum value.
- **Rate limit strategy**: the `ConcurrentApiCaller` class contains logic to gracefully handle rate limits imposed by the Crossmint API. When a rate limit error is encountered, the caller enters a 'cool-down' period during which it lowers its request rate and then slowly ramps it back up. This dynamic approach allows the application to operate as close to the rate limit as possible trying to avoid exceeding it, maximizing efficiency.
- **Map parsing**: a dedicated `MapParser` module is used to interpret the raw goal map provided by the Crossmint API. This parser translates the map into a structured format that the rest of the application can use to orchestrate the creation of astral objects.

#### TODO list

- **Map validator**: the goal map must accomplish some requirements, the applications could validate that goal map before creating the astral objects.
- **Enhance command line interface**: extend the application to accept and process command line arguments for greater flexibility. This includes backoff, retries, concurrency and delays parameters, among others
- **Handle other API errors**: right now the application handle server errors and rate limit errors when calling to API, it would be nice to handle other type of errors on those calls.
