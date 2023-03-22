import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';
import { StatusCodes } from 'http-status-codes';

let Token;
let noteId;

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  // user
  describe('POST /users/signup', () => {
    const user = {
      firstname: 'Yashwanth',
      lastname: 'Vishnu',
      email: 'Vishnu@gmail.com',
      password: 'Vishnu@1999',
      confirmpassword: 'Vishnu@1999'
    };
    it('should return 201 and create a new user', (done) => {
      request(app)
        .post('/api/v1/users')
        .send(user)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(StatusCodes.CREATED);
          done();
        });
    });
  });

  describe('GET /users/login', () => {
    const user = {
      email: 'Vishnu@gmail.com',
      password: 'Vishnu@1999'
    };
    it('should return 200 and token', (done) => {
      request(app)
        .get('/api/v1/users/login')
        .send(user)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(StatusCodes.OK);
          Token = res.body.data;
          done();
        });
    });
  });

  //note
  describe('POST /note', () => {
    const note = {
      Title: 'Hello..',
      description: 'Welcome to...'
    };
    it('should return 201 and create a note', (done) => {
      request(app)
        .post('/api/v1/note')
        .set('Authorization', `Bearer ${Token}`)
        .send(note)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(StatusCodes.CREATED);
          noteId = res.body.data._id;
          done();
        });
    });
  });

  describe('GET /note', () => {
    it('should return 200 and return a single note', (done) => {
      request(app)
        .get('/api/v1/note')
        .set('Authorization', `Bearer ${Token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(StatusCodes.OK);
          expect(res.body.data.length).to.be.equal(1);
          done();
        });
    });
  });

  describe('GET /note/:_id', () => {
    it('should return 200 and return a note', (done) => {
      request(app)
        .get(`/api/v1/note/${noteId}`)
        .set('Authorization', `Bearer ${Token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(StatusCodes.OK);
          expect(res.body.data).not.to.be.equal(null);
          done();
        });
    });
  });

  describe('PUT /note/:_id', () => {
    const note = {
      Title: 'This is updated title'
    };
    it('should return 200 and update the data', (done) => {
      request(app)
        .put(`/api/v1/note/${noteId}`)
        .set('Authorization', `Bearer ${Token}`)
        .send(note)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(StatusCodes.ACCEPTED);
          expect(res.body.data.Title).to.be.equal(note.Title);
          done();
        });
    });
  });

  describe('PUT /note/:_id/addtrash', () => {
    it('should return 200 and update the data trash to true', (done) => {
      request(app)
        .put(`/api/v1/note/${noteId}/addtrash`)
        .set('Authorization', `Bearer ${Token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(StatusCodes.OK);
          expect(res.body.data.trash).to.be.equal(true);
          done();
        });
    });
  });

  describe('PUT /note/:_id/removetrash', () => {
    it('should return 200 and update the data trash to false', (done) => {
      request(app)
        .put(`/api/v1/note/${noteId}/removetrash`)
        .set('Authorization', `Bearer ${Token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(StatusCodes.OK);
          expect(res.body.data.trash).to.be.equal(false);
          done();
        });
    });
  });

  describe('PUT /note/:_id/addArchive', () => {
    it('should return 200 and update the data Archive to true', (done) => {
      request(app)
        .put(`/api/v1/note/${noteId}/addArchive`)
        .set('Authorization', `Bearer ${Token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(StatusCodes.OK);
          expect(res.body.data.archive).to.be.equal(true);
          done();
        });
    });
  });

  describe('PUT /note/:_id/removeArchive', () => {
    it('should return 200 and update the data Archive to false', (done) => {
      request(app)
        .put(`/api/v1/note/${noteId}/removeArchive`)
        .set('Authorization', `Bearer ${Token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(StatusCodes.OK);
          expect(res.body.data.archive).to.be.equal(false);
          done();
        });
    });
  });

  describe(`DELETE /note/:_id`, () => {
    it('should return 200 and delete the data', (done) => {
      request(app)
        .delete(`/api/v1/note/${noteId}`)
        .set('Authorization', `Bearer ${Token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(StatusCodes.OK);
          done();
        });
    });
  });
});
