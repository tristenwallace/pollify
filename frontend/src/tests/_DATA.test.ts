import { _saveQuestion, _saveQuestionAnswer } from '../server/_DATA';

describe('_saveQuestion', () => {
  it('should return a saved question object with all fields populated when passed valid data', async () => {
    const newQuestion = {
      optionOneText: 'Option One',
      optionTwoText: 'Option Two',
      author: 'johndoe',
    };
    const savedQuestion = await _saveQuestion(newQuestion);
    expect(savedQuestion).toHaveProperty('id');
    expect(savedQuestion).toHaveProperty('timestamp');
    expect(savedQuestion.author).toBe(newQuestion.author);
    expect(savedQuestion.optionOne.text).toBe(newQuestion.optionOneText);
    expect(savedQuestion.optionTwo.text).toBe(newQuestion.optionTwoText);
  });

  it('should throw an error if incorrect data is passed', async () => {
    const incompleteData = {
      optionOneText: 'Option One',
      author: 'johndoe',
    };
    await expect(_saveQuestion(incompleteData)).rejects.toMatch(
      'Please provide optionOneText, optionTwoText, and author',
    );
  });
});

describe('_saveQuestionAnswer', () => {
  it('should return true when passed correctly formatted data', async () => {
    const answerData = {
      authedUser: 'sarahedo',
      qid: 'am8ehyc8byjqgar0jgpub9',
      answer: 'optionOne',
    };
    const result = await _saveQuestionAnswer(answerData);
    expect(result).toBe(true);
  });

  it('should throw an error if incorrect data is passed', async () => {
    const wrongAnswer = {
      authedUser: 'johndoe',
      qid: '12345',
      // intentionally missing 'answer' to test error handling
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await expect(_saveQuestionAnswer(wrongAnswer as any)).rejects.toMatch(
      'Please provide authedUser, qid, and answer',
    );
  });
});
