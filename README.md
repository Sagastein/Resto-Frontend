# SagaPay Frontend 

Transforming School Restaurant Payments

## Installation

Use the package manager *npm* to install foobar.
```bash
git clone repo-link
```
```bash
npm install
```

## Usage

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:4000/",//update your localhost or server
    },
  },
  plugins: [react()],
});

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
