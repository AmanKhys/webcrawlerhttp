const { normalizeURL, getURLsFromHTML } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('getURLsFromHTML absolute', () => {
    const inputBaseURL = 'https://api.boot.dev'
    const inputHTMLBody = `
    <html>
        <body>
        <a href="https://api.boot.dev/path">
            Boot.dev api
        </a>
        </body>
    </html>
    `
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://api.boot.dev/path']
    expect(actual).toEqual(expected)
})


test('getURLsFromHTML relative  ', () => {
    const inputBaseURL = 'https://api.boot.dev'
    const inputHTMLBody = `
    <html>
        <body>
        <a href="/path">
            Boot.dev api
        </a>
        </body>
    </html>
    `
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://api.boot.dev/path']
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML multiple relative and absolute  ', () => {
    const inputBaseURL = 'https://api.boot.dev'
    const inputHTMLBody = `
    <html>
        <body>
        <a href="/path">
            Boot.dev api
        </a>


        <a href="https://api.boot.dev/book">
            Boot.dev api
        </a>


        <a href="https://api.boot.dev/bank">
            Boot.dev api
        </a>


        <a href="/book">
            Boot.dev api
        </a>

        </body>
    </html>
    `
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://api.boot.dev/path','https://api.boot.dev/book','https://api.boot.dev/bank', 'https://api.boot.dev/book']
    expect(actual).toEqual(expected)
})


test('getURLsFromHTML broken url  ', () => {
    const inputBaseURL = 'https://api.boot.dev'
    const inputHTMLBody = `
    <html>
        <body>
        <a href="invalid">
            invalid path 
        </a>
        </body>
    </html>
    `
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})




test('normalizeURL strip protocol and trailing slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})


test('normalizeURL capital', () => {
    const input = 'https://BLOG.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip http', () => {
    const input = 'http://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

