// Desc: token bucket algorithm
class tokenBucket{
    constructor(tokenCapacity, tokensPerSecond, initialTocken) {
        this.tokenCapacity = tokenCapacity;//100
        this.tokensPerSecond = tokensPerSecond;//10
        this.tokens = initialTocken;//50
        this.lastRefillTime = Date.now();
    }
    refillBucket() {
        let now = Date.now();//20
        let elapsedTime = (now - this.lastRefillTime) / 1000;//10
        this.lastRefillTime = now;//10
        let newTokens = elapsedTime * this.tokensPerSecond;//10*5=50
        this.tokens = Math.min(this.tokens + newTokens, this.tokenCapacity);//100
        if(this.tokens < this.tokenCapacity){
            console.log("token bucket is not full");
           this.tokens = this.tokens + newTokens;
            return true;;
        } else {
           
            console.log("token bucket is full");
             return false;
        }

       
    }
}
module.exports = tokenBucket;