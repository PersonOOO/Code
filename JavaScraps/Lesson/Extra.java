//Maze solver
 /*Scanner in = new Scanner(System.in);
        int n=in.nextInt(), m=in.nextInt(); 
        in.nextLine(); // required because previous operation did not consume the \n
        char[][] grid = new char[n][];
        for (int r=0; r<n; ++r)
            grid[r] = in.nextLine().toCharArray();
        int sr=0, sc=0; // start coords, initial values don't matter
        for (int r=0; r<n; ++r)
            for (int c=0; c<m; ++c)
                if (grid[r][c]=='S') {
                    sr=r; sc=c; }
        Queue<Integer> qr=new ArrayDeque<>(), qc=new ArrayDeque<>(), or=new ArrayDeque<>();
        qr.add(sr); qc.add(sc);
        int[] dr = { -1,  0,  1,  0 }, 
              dc = {  0, -1,  0,  1 };
        int l = 0;
        while (!qr.isEmpty()) { // note that qr.size()==qc.size() always
            int r=qr.remove(), c=qc.remove();
            if (grid[r][c]=='#') 
                continue;
            else if (grid[r][c]=='T') {
                System.out.print(l/2 );  
                return;
            } else grid[r][c] = '#'; l++; // mark as visited
            for (int i=0; i<4; ++i) {
                int nr=r+dr[i], nc=c+dc[i]; // new coordinates
                if (0<=nr&&nr<n && 0<=nc&&nc<m && grid[nr][nc]!='#') {
                    qr.add(nr); 
                    qc.add(nc);
                }
            }
        }
        System.out.print("NO");*/


        
