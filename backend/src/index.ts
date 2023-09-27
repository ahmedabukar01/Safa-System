import express, {Request, Response } from "express";
import {PrismaClient} from "@prisma/client";
import dotenv from "dotenv";
dotenv.config()

// const express = require("express")

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 800

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is Running ${PORT}`)
})