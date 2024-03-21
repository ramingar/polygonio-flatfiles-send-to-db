import {promises as fs} from 'fs'
import path from 'path';
import config from './config/config.js'
import {ConsoleLog, Map, PathJoin, PromiseAllSettled, ReadFile} from './utils/utils.js';

const flatFilesFolder = config.flatFilesFolder;

fs
    .readdir(flatFilesFolder)
    .then(Map(PathJoin(path, flatFilesFolder)))
    .then(Map(ReadFile(fs)))
    .then(PromiseAllSettled)
    .then(val => val)
    .then(Map(ConsoleLog))