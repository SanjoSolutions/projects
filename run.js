export function run(fn) {
    fn().then(console.log, console.error)
}
