package com.npc.say_vr.domain.user.repository.activityRepository;

import com.npc.say_vr.domain.user.domain.Activity;
import com.npc.say_vr.domain.user.dto.ActivityDto;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ActivityRepositoryImpl implements ActivityRepository{

  private final QueryDslActivityRepository queryDslActivityRepository;
  private final JpaActivityRepository jpaActivityRepository;

  @Override
  public void save(Activity activity) {
    jpaActivityRepository.save(activity);

  }

  @Override
  public List<ActivityDto> readActvityYear(Long userId, LocalDate today) {
    return queryDslActivityRepository.readActvityYear(userId, today);
  }
}
