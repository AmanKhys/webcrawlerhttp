const {sortPages} = require('./report.js')
const { test, expect } = require('@jest/globals')


test('sortPages', () => {
    const input = {
        'https://blog.boot.dev/path/': 22,
        'https://blog.boot.dev/uber/':33
    }
    const actual = sortPages(input)
    const expected = [
        ['https://blog.boot.dev/uber/', 33],
        ['https://blog.boot.dev/path/', 22]
    ]
    expect(actual).toEqual(expected)
})


test('sortPages 5 pages', () => {
    const input = {
        'https://blog.boot.dev/path/': 22,
        'https://blog.boot.dev/ubbe/': 12,
        'https://blog.boot.dev/blackie/': 2,
        'https://blog.boot.dev/baa/': 22,
        'https://blog.boot.dev/uber/':33
    }
    const actual = sortPages(input)
    const expected = [
        ['https://blog.boot.dev/uber/', 33],
        ['https://blog.boot.dev/path/', 22],
        ['https://blog.boot.dev/baa/', 22],
        ['https://blog.boot.dev/ubbe/', 12],
        ['https://blog.boot.dev/blackie/', 2]
    ]
    expect(actual).toEqual(expected)
})


