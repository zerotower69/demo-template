import { Test, TestingModule } from '@nestjs/testing';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';

describe('OauthController', () => {
  let oauthController: OauthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OauthController],
      providers: [OauthService],
    }).compile();

    oauthController = app.get<OauthController>(OauthController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(oauthController.getHello()).toBe('Hello World!');
    });
  });
});
