// Your getIntersection function
function getIntersection(A, B, C, D) {
    const tTop=(D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
    const uTop=(C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);
    const bottom=(D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);
   
    if(bottom!=0){
        const t=tTop/bottom;
        const u=uTop/bottom;
        if(t>=0 && t<=1 && u>=0 && u<=1){
            return {
                x:lerp(A.x,B.x,t),
                y:lerp(A.y,B.y,t),
                offset:t
            }
        }
    }


    return null;
}

// Linear interpolation function
function lerp(A, B, t) {
    return A + (B - A) * t;
}

function polysIntersect(poly1, poly2){
    for(let i=0;i<poly1.length;i++){
        for(let j=0;j<poly2.length;j++){
            const touch=getIntersection(
                poly1[i],
                poly1[(i+1)%poly1.length],
                poly2[j],
                poly2[(j+1)%poly2.length]
            );
            if(touch){
                return true;
            }
        }
    }
    return false;
}

// // Test cases
// function testGetIntersection() {
//     // Example of intersecting lines
//     const intersectingLines = [
//         { A: {x: 0, y: 0}, B: {x: 10, y: 10}, C: {x: 0, y: 10}, D: {x: 10, y: 0} },
//         // Add more test cases as needed
//     ];

//     // Example of non-intersecting lines
//     const nonIntersectingLines = [
//         { A: {x: 0, y: 0}, B: {x: 0, y: 10}, C: {x: 1, y: 1}, D: {x: 1, y: 11} },
//         // Add more test cases as needed
//     ];

//     console.log("Testing Intersecting Lines:");
//     intersectingLines.forEach((lines, index) => {
//         const result = getIntersection(lines.A, lines.B, lines.C, lines.D);
//         console.log(`Test ${index + 1}:`, result ? `Intersection at (${result.x}, ${result.y})` : "No Intersection");
//     });

//     console.log("\nTesting Non-Intersecting Lines:");
//     nonIntersectingLines.forEach((lines, index) => {
//         const result = getIntersection(lines.A, lines.B, lines.C, lines.D);
//         console.log(`Test ${index + 1}:`, result ? `Intersection at (${result.x}, ${result.y})` : "No Intersection");
//     });
// }

// // Run the test
// testGetIntersection();
