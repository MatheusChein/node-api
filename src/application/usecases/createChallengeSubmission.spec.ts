import { InMemoryChallengesRepository } from "../../../tests/repositories/in-memory-challenges-repository";
import { InMemoryStudentsRepository } from "../../../tests/repositories/in-memory-students-repository";
import { Challenge } from "../../domain/entities/challenge";
import { Student } from "../../domain/entities/student";
import { Submission } from "../../domain/entities/submission";
import { CreateChallengeSubmission } from "./createChallengeSubmission";

describe("Create challenge submission use case", () => {
  it("should be able to create a new challenge submission", async () => {
    const studentsRepository = new InMemoryStudentsRepository();
    const challengesRepository = new InMemoryChallengesRepository();

    const student = Student.create({
      name: "Matheus",
      email: "Chein",
    });

    const challenge = Challenge.create({
      instructionsUrl: "fake-url",
      title: "fake-challenge",
    });

    studentsRepository.items.push(student);
    challengesRepository.items.push(challenge);

    const createChallengeSubmission = new CreateChallengeSubmission(
      studentsRepository,
      challengesRepository
    );

    const response = await createChallengeSubmission.execute({
      studentId: student.id,
      challengeId: challenge.id,
    });

    expect(response).toBeTruthy();
  });
});
