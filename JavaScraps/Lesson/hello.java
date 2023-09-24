//import java.io.*; input-output classes
//import java.util.*; Mathy or utility classes

import java.util.ArrayList;

public class hello {
  
  public static void main(String args[])
  {
      
    int t=0;
    for(int x=1;x<=5;x++){
      switch(x){
      case 1:t+=x;System.out.print(x);break;
      case 2:t+=x+1;System.out.print(x);
      case 3:t*=2;System.out.print(x);break;
      case 4:t+=3;System.out.print(x);
      default: t-=x;System.out.print(x);
      }
    }
    System.out.print(t);
    
  }

public static void solve(int[] arr, int size)
{
  if(size == 1)
  {
    for(int i : arr)
      System.out.print(i + " ");
    System.out.println();
  }
  else{
    solve(arr, size-1);

    for(int i =0; i < size-1; i++)
    {
      if(size %2== 0)
      {
        int temp = arr[size-1];
        arr[size-1] = arr[i];
        arr[i] = temp;

      }
      else{
        int temp = arr[0];
        arr[0] = arr[size-1];
        arr[size-1] = temp;
      }
      solve(arr, size-1);
    }
  }
}
}