'use client';

import styles from './RoleModify.module.css';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

interface Users {
  user_id: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<Users[]>([]);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('データ取得エラー:', error);
    }
  }, []);

  const handleRoleChange = async (user_id: string, newRole: string) => {
    try {
      const response = await axios.put(`/api/users/${user_id}/role`, { role: newRole });

      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.user_id === user_id ? { ...user, role: newRole } : user))
        );
      } else {
        alert('権限の更新に失敗しました');
      }
    } catch (error) {
      console.error('権限更新エラー:', error);
      alert('サーバーエラーが発生しました');
    }
  };

  const handleUserDelete = async (user_id: string) => {
    try {
      const response = await axios.put(`/api/users/${user_id}/delete`);

      if (response.status === 200) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.user_id !== user_id));
        alert('ユーザーの削除に成功しました');
      } else {
        alert('ユーザーの削除に失敗しました');
      }
    } catch (error) {
      console.error('ユーザー削除エラー:', error);
      alert('サーバーエラーが発生しました');
    }
  };

  useEffect(() => {
    void fetchUsers();
  }, []);

  return (
    <>
      <h2>ユーザー権限変更</h2>
      <button onClick={() => fetchUsers()}>リロード</button>
      <table className={styles.tb}>
        <thead>
          <tr>
            <th>ユーザーID</th>
            <th>名前</th>
            <th>権限</th>
            <th>作成日</th>
            <th>更新日</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>{user.user_id}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{new Date(user.createdAt).toLocaleString()}</td>
              <td>{new Date(user.updatedAt).toLocaleString()}</td>
              <td>
                <select value={user.role} onChange={(e) => handleRoleChange(user.user_id, e.target.value)}>
                  <option value="ADMIN">管理者</option>
                  <option value="EDITOR">編集者</option>
                  <option value="VIEWER">閲覧者</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleUserDelete(user.user_id)}>削除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
