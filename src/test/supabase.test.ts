
import { describe, it, expect, vi } from 'vitest';
import { supabaseMock } from './mocks/supabase';

describe('Supabase Mock', () => {
  it('should have storage methods', () => {
    const { storage } = supabaseMock;
    expect(storage.from).toBeDefined();
    
    const bucket = storage.from('test-bucket');
    expect(bucket.upload).toBeDefined();
    expect(bucket.getPublicUrl).toBeDefined();
  });
  
  it('should have database methods', () => {
    const fromResult = supabaseMock.from('test-table');
    expect(fromResult.insert).toBeDefined();
    expect(fromResult.update).toBeDefined();
    expect(fromResult.delete).toBeDefined();
    expect(fromResult.select).toBeDefined();
  });
  
  it('should have authentication methods', () => {
    const { auth } = supabaseMock;
    expect(auth.getSession).toBeDefined();
    expect(auth.signIn).toBeDefined();
    expect(auth.signOut).toBeDefined();
    expect(auth.signUp).toBeDefined();
    expect(auth.onAuthStateChange).toBeDefined();
  });
  
  it('should mock storage upload method', async () => {
    const bucket = supabaseMock.storage.from('test-bucket');
    const result = await bucket.upload('path', {});
    expect(result.error).toBeNull();
  });
  
  it('should mock storage getPublicUrl method', () => {
    const bucket = supabaseMock.storage.from('test-bucket');
    const result = bucket.getPublicUrl('path');
    expect(result.data.publicUrl).toBe('https://example.com/image.jpg');
  });
  
  it('should mock database insert method', async () => {
    const insertQuery = supabaseMock.from('test-table').insert({});
    const selectQuery = insertQuery.select();
    const result = await selectQuery.single();
    expect(result.error).toBeNull();
    expect(result.data).toBeDefined();
  });
  
  it('should mock database update method', async () => {
    const updateQuery = supabaseMock.from('test-table').update({});
    const result = await updateQuery.eq('id', '1');
    expect(result.error).toBeNull();
  });
  
  it('should mock database delete method', async () => {
    const deleteQuery = supabaseMock.from('test-table').delete();
    const result = await deleteQuery.eq('id', '1');
    expect(result.error).toBeNull();
  });
  
  it('should mock database select method', async () => {
    const selectQuery = supabaseMock.from('test-table').select();
    const eqQuery = selectQuery.eq('id', '1');
    const result = await eqQuery.single();
    expect(result.error).toBeNull();
    expect(result.data).toBeDefined();
  });
  
  it('should mock auth getSession method', async () => {
    const result = await supabaseMock.auth.getSession();
    expect(result.error).toBeNull();
    expect(result.data.session).toBeDefined();
  });
  
  it('should mock auth signOut method', async () => {
    const result = await supabaseMock.auth.signOut();
    expect(result.error).toBeNull();
  });
});
