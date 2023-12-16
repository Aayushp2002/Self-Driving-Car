function lerp(A,B,t){
    return A+(B-A)*t; // linear interpolation
}

function getIntersection(A,B,C,D){
    const tTop=(D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x); // get the top of the t value
    const uTop=(C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y); // get the top of the u value
    const bottom=(D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y); // get the bottom of the t value
    

    if(bottom!=0){
        const t=tTop/bottom; // get the t value
        const u=uTop/bottom; // get the u value

        if(t>=0&&t<=1&&u>=0&&u<=1){ // if the t and u values are between 0 and 1
            return { // return the intersection
                x:lerp(A.x,B.x,t),
                y:lerp(A.y,B.y,t),
                offset:t
            };
        }
    }
    return null; // return null if there is no intersection
}