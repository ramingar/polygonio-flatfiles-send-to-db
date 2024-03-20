import {promises as fs} from 'fs'
import path from 'path';
import config from './config/config.js'
import {ConsoleLog, Map, PathJoin} from './utils/utils.js';

const flatFilesFolder = config.flatFilesFolder;

fs
    .readdir(flatFilesFolder)
    .then(Map(PathJoin(path, flatFilesFolder)))
    .then(ConsoleLog)