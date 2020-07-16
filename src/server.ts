import {appFactory} from "./app";
import express from 'express';
import {ServerSideRendering} from 'jigjs/framework/server/ssr';
import {Server} from "jigjs/framework/server/server";


const template = `<html lang="en">
    <head>
        <title>Jig!</title>
        <link href="https://fonts.googleapis.com/css2?family=Mandali&display=swap" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                padding: 0;
                margin: 0;
                background: #0b050e;
                font-family: Mandali, sans-serif;
            }

            /* jigcss does not support keyframes yet :( */
            @keyframes fadein {
              from {
                opacity: 0;
              }
            
              to {
                opacity: 1;
              }
            }

        </style>
    </head>
    <body>
        <div id="root"></div>
        <!-- jigjs main build file -->
        <script src="/main.app.js"></script>
    </body>
</html>`;

const server = new Server(new ServerSideRendering(appFactory, template, '#root'));

server.app.use(express.static(process.cwd() + '/assets'));

server.start(parseInt(process.env.PORT) || 3333);
