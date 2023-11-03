package com.npc.say_vr.domain.user.repository;

import com.npc.say_vr.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

  User findByEmail(String email);

}
