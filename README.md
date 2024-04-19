# go-slang

A Concurrent Virtual Machine for a subset of **Go**. This project aims to develop a web-based virtual machine capable of executing a concurrent sublanguage of Go. The project extends the work of the [Source Academy](https://sourceacademy.org/) frontend and the js-slang framework to implement a web-based VM. 

![CleanShot 2024-04-19 at 12 34 50@2x](https://github.com/ngchisern/go-slang/assets/64767959/9276051c-6444-4597-acb6-5280b7ff58d8)


## Using go-slang in your local Source Academy

The concurrent virtual machine for Go is integrated into Source Academy locally. To run the web-based implementation of the machine, follow the instructions below:

In go-slang:
```
npm install
npm run build
yarn link
```

In [js-slang](https://github.com/xyliew25/js-slang):
```
yarn
yarn build
yarn link
```

In [frontend](https://github.com/xyliew25/frontend):
```
yarn
yarn link "go-slang"
yarn link "js-slang"
yarn start
```

Then, open http://localhost:8000 to view it in your browser.

## Developing and Modifying go-slang

Since spawning web workers requires serving the script through the frontend, observing modifications can be somewhat troublesome. We are exploring methods to streamline this process, but the following steps outline the current method for developing and modifying the go-slang codebase:

1. Use TypeScript Compiler (tsc) to compile the specific worker TypeScript file to JavaScript. For example:

```bash
tsc src/vm/scheduler/worker.ts
```

2.  Bundle the JavaScript Using Browserify

```bash
browserify src/vm/scheduler/worker.js > bundle.js
```

3. Copy the generated bundle.js file to the appropriate directory within the frontend's external libraries folder. For example:

```bash
cp bundle.js frontend/public/externalLibs/web/bundle.js
```

4. After successful deployment, consider removing the intermediate JavaScript files generated during the compilation process to keep your working directory clean.


## Testing

Test cases for each main component, i.e., parser, compiler and virtual machine, can be found in the \_\_tests\_\_ folder of each component directory, e.g., virtual machine tests can be found in src/vm/\_\_tests\_\_/vm.test.ts.

Our test cases are comprehensive in that they cover all features supported, e.g., sequential constructs like variable declarations as well as concurrent constructs like goroutine, WaitGroup, mutex, and channels. In addition to positive test cases, we also ensure that each component throws the correct error when encountered invalid programs. For instance, the virtual machine should throw a deadlock error should the program attempt to lock a mutex twice.

You can run the entire test suite by running the following command:
```bash
npm run test
```


## Other Resouces
[Presentation Slides](https://docs.google.com/presentation/d/1EpvSfTcqr9CTSF3NAdfNamkBq1Ah_h_tVZ83yjLNiSk/edit?usp=sharing)


