import { faker } from "@faker-js/faker";
import postService from "../services/postService";
import { PostDTO } from "../constants/interfaces";
async function seedDatabase() {
  try {
    const posts = await postService.getAll();
    for (let i = 0; i < 10; i++) {
      const name: string = faker.lorem.words({ min: 1, max: 10 });
      const description: string = faker.lorem.paragraphs({ min: 1, max: 4 });
      const post: PostDTO = { name, description };
      await postService.create(post);
    }
  } catch (error) {
    console.error(error);
  }
}
seedDatabase();
