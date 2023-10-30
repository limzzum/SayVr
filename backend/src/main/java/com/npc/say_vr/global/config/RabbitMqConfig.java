//package com.npc.say_vr.global.config;
//
//import ch.qos.logback.classic.pattern.MessageConverter;
//import org.springframework.amqp.core.Binding;
//import org.springframework.amqp.core.BindingBuilder;
//import org.springframework.amqp.core.Queue;
//import org.springframework.amqp.core.TopicExchange;
//import org.springframework.amqp.rabbit.connection.ConnectionFactory;
//import org.springframework.amqp.rabbit.core.RabbitTemplate;
//import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
//import org.springframework.context.annotation.Bean;
//
//public class RabbitMqConfig {
//
//    private static final String EXCAHGE_NAME = "sample.exchange";
//    private static final String QUEUE_NAME = "sample.queue";
//    private static final String ROUTING_KEY = "sample.routing.#";
//
//    @Bean
//    TopicExchange exchange() {
//        return  new TopicExchange(EXCAHGE_NAME);
//    }
//
//    @Bean
//    Queue queue() {
//        return new Queue(QUEUE_NAME);
//    }
//
//    @Bean
//    Binding binding(Queue queue, TopicExchange exchange) {
//        return BindingBuilder.bind(queue).to(exchange).with(ROUTING_KEY);
//    }
//
//    @Bean
//    RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory, MessageConverter messageConverter) {
//        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
//        rabbitTemplate.setMessageConverter(new Jackson2JsonMessageConverter());
//        return rabbitTemplate;
//    }
//}
