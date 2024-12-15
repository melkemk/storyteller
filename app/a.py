from itertools import accumulate


for i in range(int(input())):
    n, k, z = map(int, input().split())
    ar = list(map(int, input().split()))
    par = ar[0]
    pre = [0] + list(accumulate(ar))
    ans = par
    for i in range(1, n):
        k -= 1
        if not k:
            break
        
        zz = min(k//2, z)
        localans = par
        localans += (zz * (ar[i] + ar[i-1]))
        tt = k - (zz * 2)
        if tt:
            localans += pre[min(i+tt, n)] - pre[i]
        ans = max(ans, localans)
        par += ar[i]
    print(ans)
