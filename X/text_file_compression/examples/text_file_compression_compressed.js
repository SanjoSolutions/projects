0:      
1:    
2:ompressedText
3:ompressed
4:ompress
5:token
6: filePathTo
7: = process.argv[
8:filePathTo
9:{encoding: 'utf8'}
10:const 
11:headerLine
12:ext.replace(new RegExp(
13:.substring(
14:length
15:indexOfHeaderSeparator
16:  return 
17: header
18:index
19:separatorIndex
20:haracter
21: = await fs.readFile(
22: if (operation === '
23:await fs.writeFile(
24:escapeRegExpText(
25:minLength
26:.includes
27: replaceCount

import { promises as fs } from 'fs'

function  24 text) {
 16 t 12 '[\\[\\]().*+\\\\]', 'g'), c 20  => `\\${c 20 }`)
}

;(async function () {
   10 operation 7 2]

  22 c 4 ') {
 1 const 6 C 4  7 3]
 1 const 6 SaveC 3 File 7 4]

 1  10 text 21 
 0  8 C 4 ,
 0  9 
 1 )

 1  10 map = new Map()

 1  10  25  = 3
 1 for (let  18  = 0;  18  < text. 14 ;  18 ++) {
 0 if (!text 13  18 ,  18  +  25 ) 26 ('\n')) {
 0   for (let  14  =  25 ;  14  <= text. 14  -  18 ;  14 ++) {
 0  1 if (text[ 18  +  14  - 1] === '\n') {
 0  0 break
 0  1 }
 0  1  10  5  = text 13  18 ,  18  +  14 )
 0  1 if (map.has( 5 )) {
 0  0 map.set( 5 , map.get( 5 ) + 1)
 0  1 } else {
 0  0 map.set( 5 , 1)
 0  1 }
 0   }
 0 }
 1 }

 1 let  5 s = [...map]

 1  5 s =  5 s.map(([ 5 , count]) => {
 0 return [ 5 , count, (count *  5 . 14 ) - (2 +  5 . 14  + 1 + count * 3)]
 1 })

 1  5 s =  5 s.filter(([ 5 , count, c 20 sSaved]) => c 20 sSaved > 0)

 1  5 s.sort((a, b) => {
 0 if (a[0] 26 (b[0])) {
 0  16 -1
 0 } else if (b[0] 26 [a[0]]) {
 0  16 1
 0 } else {
 0  16 b[2] - a[2]
 0 }
 1 })

 1 console.log( 5 s)

 1 let 17  = ''
 1 let c 2  = text
 1 let nextC 2 

 1 let  5 Index = 0
 1 for ( 10 [ 5 ] of  5 s) {
 0 let 27  = 0
 0  10  11  = `${ 5 Index}:${ 5 }\n`
 0 nextC 2  = c 2 .replace(new RegExp( 24  5 ), 'g'), () => {
 0   27 ++
 0  16 `\0${ 5 Index}\0`
 0 })
 0 if ( 11 . 14  + nextC 2 . 14  < c 2 . 14 ) {
 0   17  = 17  +  11 
 0   c 2  = nextC 2 
 0    5 Index++
 0 }
 1 }
 1 c 2  = 17  + '\n' + c 2 

 1 console.log(`C 20 s saved: ${text. 14  - c 2 . 14 }`)

 1  23 
 0  8 SaveC 3 File,
 0 c 2 ,
 0  9 
 1 )
  } else 22 dec 4 ') {
 1 const 6 Dec 4  7 3]
 1 const 6 SaveDec 3 File 7 4]

 1 let c 2  21 
 0  8 Dec 4 ,
 0  9 
 1 )

 1  10  15  = c 2 . 18 Of('\n\n')
 1  10 header = c 2  13 0,  15 )
 1 c 2  = c 2  13  15  + 2)

 1 let  5 s = 17 .split('\n').map( 11  => {
 0  10  19  =  11 . 18 Of(':')
 0 return [Number( 11  13 0,  19 )),  11  13  19  + 1)]
 1 })

 1  5 s =  5 s.reverse()

 1 let text = c 2 
 1 for ( 10 [ 5 Index,  5 ] of  5 s) {
 0 text = t 12 `\0${ 5 Index}\0`, 'g'),  5 )
 1 }

 1  23 
 0  8 SaveDec 3 File,
 0 text,
 0  9 
 1 )
  }
})()
