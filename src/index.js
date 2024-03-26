import {promises as fs} from 'fs'
import path from 'path'
import mysql from 'mysql2'
import moment from 'moment'
import config from './config/config.js'
import {
    ConsoleLog, Filter, Flat, insertDayAggs, lengthGreaterThan,
    Map,
    PathJoin,
    PromiseAllSettled,
    ReadFile, setParamsForQuery, Slice,
    splitCSVByBreakLines,
    splitCSVByFields
} from './utils/utils.js';
import mysqlAdapter from './adapters/mysql.js'
import {insertDayAggsQuery} from './repository/dayAggsRepository.js';

const flatFilesFolder = config.flatFilesFolder;

const adapter = mysqlAdapter(mysql);
const conn    = adapter.start(config.db);

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
    .then(Map(Map(setParamsForQuery(moment))))
    .then(Flat(Infinity))
    .then(Map(insertDayAggs(adapter, conn, insertDayAggsQuery())))
    .then(PromiseAllSettled)
    // .then(val => val)
    .then(Map(ConsoleLog))
    .catch(ConsoleLog)
    .finally(() => adapter.end(conn))