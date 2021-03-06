const workoutExercise = `
  type WorkoutExercise implements Exercise {
    id: ID
    name: String
    reps: Int
    distance: Int
    sets: Int
    rest: Float
    tempo: String
    workout: ID
    weight: [Int]
    time: [Int]
    bestWeight: Int
    bestTime: Int
  }
`;

export default workoutExercise;