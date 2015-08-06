//Economic fuctions
// a = net cash flow
// G = capital budgeting
// R = remaining value
// n = service life
// r = interest (interal) % 

function netPresentValue(a, G, R, n, r)
{
    r = r / 100;
    return (a * (1 - Math.pow((1 + r), -n)) - G + R * (Math.pow(1 / (1 + r)), n) > 0);
    // Has to be entered in the db like : a * ( 1 - ( 1 + ( r / 100 ) ) ^ ( n - 2 * n ) ) - G + R * ( ( 1 / ( 1 + ( r / 100 ) ) ) ^ n )
}

function equivalentAnnualCost(a, G, R, n, r)
{
    r = r / 100;
    return (a - (G - R * (1 / Math.pow((1 + r/100), n)) * (r / 100 - Math.pow((1 + r/100), -n))) < a);

     a - ( G - R * ( 1 / ( 1 + ( r / 100) ) ^ n ) * ( r / 100 - ( 1 + ( r / 100 ) ) ^ ( n - 2 * n )))
}

function paybackSimple(G, a, n)
{
    return (G / a) < n;
}

function paybackAdvanced()
{
    //TODO
}