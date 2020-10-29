import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';

import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecs_patterns from "@aws-cdk/aws-ecs-patterns";
import { Vpc } from '@aws-cdk/aws-ec2';


export class CdkWorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //code goes here
    const vpc = new ec2.Vpc(this,"MyVpc",{
      maxAzs: 3
    });

    const cluster = new ecs.Cluster(this,"MyCluster",{
      vpc:vpc
    });

    new ecs_patterns.ApplicationLoadBalancedFargateService(this,"MyFargateService",{
      cluster:cluster,
      cpu:512,
      desiredCount:6,
      taskImageOptions:{image:ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample")},
      memoryLimitMiB:2048,
      publicLoadBalancer:true
    });

  }
}
