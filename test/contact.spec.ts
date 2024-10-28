import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import * as request from 'supertest'
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { TestService } from './test.service';
import { TestModule } from './test.module';

describe('ContactController', () => {
  let app: INestApplication;
  let logger: Logger;
  let testService: TestService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER);
    testService = app.get(TestService);
  });

  describe("POST /api/contacts", () => {
    beforeEach(async () => {
      await testService.deleteContact();
      await testService.deleteUser();

      await testService.createUser();
    });

    it("should be rejected if request is invalid", async () => {
      const response = await request(app.getHttpServer())
        .post('/api/contacts')
        .set('Authorization', 'test')
        .send({
          first_name: '',
          last_name: '',
          email: 'salah',
          phone: '',
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it("should be able to create contact", async () => {
      const response = await request(app.getHttpServer())
        .post('/api/contacts')
        .set('Authorization', 'test')
        .send({
          first_name: 'test',
          last_name: 'test',
          email: 'test@example.com',
          phone: '99999',
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.first_name).toBe('test');
      expect(response.body.data.last_name).toBe('test');
      expect(response.body.data.email).toBe('test@example.com');
      expect(response.body.data.phone).toBe('99999');
    });
  });

  // describe("POST /api/users/login", () => {
  //   beforeEach(async () => {
  //     await testService.deleteUser();
  //     await testService.createUser();
  //   });

  //   it("should be rejected if request is invalid", async () => {
  //     const response = await request(app.getHttpServer())
  //       .post('/api/users/login')
  //       .send({
  //         username: '',
  //         password: '',
  //       });

  //     logger.info(response.body);

  //     expect(response.status).toBe(400);
  //     expect(response.body.errors).toBeDefined();
  //   });

  //   it("should be able to login", async () => {
  //     const response = await request(app.getHttpServer())
  //       .post('/api/users/login')
  //       .send({
  //         username: 'test',
  //         password: 'test',
  //       });

  //     logger.info(response.body);

  //     expect(response.status).toBe(200);
  //     expect(response.body.data.username).toBe('test');
  //     expect(response.body.data.name).toBe('test');
  //     expect(response.body.data.token).toBeDefined();
  //   });
  // });

  // describe("GET /api/users/current", () => {
  //   beforeEach(async () => {
  //     await testService.deleteUser();
  //     await testService.createUser();
  //   });

  //   it("should be rejected if token is invalid", async () => {
  //     const response = await request(app.getHttpServer())
  //       .get('/api/users/current')
  //       .set('Authorization', 'wrong');

  //     logger.info(response.body);

  //     expect(response.status).toBe(401);
  //     expect(response.body.errors).toBeDefined();
  //   });

  //   it("should be able to get user", async () => {
  //     const response = await request(app.getHttpServer())
  //       .get('/api/users/current')
  //       .set('Authorization', 'test');

  //     logger.info(response.body);

  //     expect(response.status).toBe(200);
  //     expect(response.body.data.username).toBe('test');
  //     expect(response.body.data.name).toBe('test');
  //   });
  // });

  // describe("PATCH /api/users/current", () => {
  //   beforeEach(async () => {
  //     await testService.deleteUser();
  //     await testService.createUser();
  //   });

  //   it("should be rejected if request is invalid", async () => {
  //     const response = await request(app.getHttpServer())
  //       .patch('/api/users/current')
  //       .set('Authorization', 'test')
  //       .send({
  //         name: '',
  //         password: '',
  //       });

  //     logger.info(response.body);

  //     expect(response.status).toBe(400);
  //     expect(response.body.errors).toBeDefined();
  //   });

  //   it("should be able to update name", async () => {
  //     const response = await request(app.getHttpServer())
  //       .patch('/api/users/current')
  //       .set('Authorization', 'test')
  //       .send({
  //         name: 'test updated',
  //       });

  //     logger.info(response.body);

  //     expect(response.status).toBe(200);
  //     expect(response.body.data.username).toBe('test');
  //     expect(response.body.data.name).toBe('test updated');
  //   });

  //   it("should be able to update password", async () => {
  //     let response = await request(app.getHttpServer())
  //       .patch('/api/users/current')
  //       .set('Authorization', 'test')
  //       .send({
  //         password: 'password updated',
  //       });

  //     logger.info(response.body);

  //     expect(response.status).toBe(200);
  //     expect(response.body.data.username).toBe('test');
  //     expect(response.body.data.name).toBe('test');

  //     response = await request(app.getHttpServer())
  //       .post('/api/users/login')
  //       .send({
  //         username: 'test',
  //         password: 'password updated'
  //       });

  //     logger.info(response.body);

  //     expect(response.status).toBe(200);
  //     expect(response.body.data.username).toBe('test');
  //     expect(response.body.data.token).toBeDefined();
  //   });
  // });

  // describe("DELETE /api/users/current", () => {
  //   beforeEach(async () => {
  //     await testService.deleteUser();
  //     await testService.createUser();
  //   });

  //   it("should be rejected if token is invalid", async () => {
  //     const response = await request(app.getHttpServer())
  //       .delete('/api/users/current')
  //       .set('Authorization', 'wrong');

  //     logger.info(response.body);

  //     expect(response.status).toBe(401);
  //     expect(response.body.errors).toBeDefined();
  //   });

  //   it("should be able to logout user", async () => {
  //     const response = await request(app.getHttpServer())
  //       .delete('/api/users/current')
  //       .set('Authorization', 'test');

  //     logger.info(response.body);

  //     expect(response.status).toBe(200);
  //     expect(response.body.data).toBe(true);

  //     const user = await testService.getUser();
  //     expect(user.token).toBeNull();
  //   });
  // });
});
