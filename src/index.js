import {promises as fs} from 'fs'
import path from 'path';
import config from './config/config.js'
import {
    ConsoleLog, Filter, lengthGreaterThan,
    Map,
    PathJoin,
    PromiseAllSettled,
    ReadFile, Slice,
    splitCSVByBreakLines,
    splitCSVByFields
} from './utils/utils.js';

const flatFilesFolder = config.flatFilesFolder;

fs
    .readdir(flatFilesFolder)
    .then(Map(PathJoin(path, flatFilesFolder)))
    .then(Map(ReadFile(fs)))
    .then(PromiseAllSettled)
    .then(Map(({value}) => value))
    .then(Map(splitCSVByBreakLines))
    .then(Map(Map(splitCSVByFields)))
    .then(Map(Slice(1)))
    .then(Map(Filter(lengthGreaterThan(7))))
    .then(val => val)
    .then(Map(ConsoleLog))