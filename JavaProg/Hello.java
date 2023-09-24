public class Hello {
  public static void main(String args[]) {
    System.out.print(birthdayExperiment());
  }

  private static int birthdayExperiment() {
    final int NUM_OF_EXPERIMENTS = 1000000;
    final int DAYS_IN_YEAR = 365;
    final int NUM_OF_PEOPLE = 182;
    int pairCount = 0;
    for (int i = 0; i < NUM_OF_EXPERIMENTS; i++) {
      pairCount += sharedBirthdays(NUM_OF_PEOPLE, DAYS_IN_YEAR);
    }
    return pairCount / NUM_OF_EXPERIMENTS; // How many decimals here? (Presuming zero but who knows) Also
                                           // "experiement" singular? Which one then?
  }

  private static String fiftyPercentExperiment() {
    final int NUM_OF_EXPERIMENTS = 50000;
    final int DAYS_IN_YEAR = 365;
    final int MAX_NUM_OF_PEOPLE = 100;
    String table = "";
    int succesfulRunCount = 0;
    for (int i = 2; i <= MAX_NUM_OF_PEOPLE; i++) {
      for (int j = 0; j < NUM_OF_EXPERIMENTS; j++) {
        if (sharedBirthdays(i, DAYS_IN_YEAR) > 0) {
          succesfulRunCount++;
        }
      }
      table += "Num people: " + i + ", number of experiments with one or more shared birthday: " + succesfulRunCount
          + ", percentage: " + String.format("%.2f", (double) succesfulRunCount / NUM_OF_EXPERIMENTS * 100) + "\n";
      succesfulRunCount = 0;
    }
    return table;
  }

  public static int sharedBirthdays(int numPeople, int numDaysInYear) {
    // check preconditions
    if (numPeople <= 0 || numDaysInYear <= 0) {
      throw new IllegalArgumentException("Violation of precondition: " +
          "sharedBirthdays. both parameters must be greater than 0. " +
          "numPeople: " + numPeople +
          ", numDaysInYear: " + numDaysInYear);
    }

    int[] birthdayTally = new int[numDaysInYear]; // May be space expensive but is super easy programming
    for (int i = 0; i < numPeople; i++) {
      birthdayTally[(int) (Math.random() * numDaysInYear)]++;
    }

    int sharedDays = 0;
    for (int i = 0; i < numDaysInYear; i++) {
      sharedDays += countLinks(birthdayTally[i]);
    }
    return sharedDays;

  }

  private static int countLinks(int people) {
    // Fully linked graphs formula (n)(n-1)/2 written out
    int connections = 0;
    for (int i = people; i > 1; i--) {
      connections += i - 1;
    }

    return connections;
  }

}
