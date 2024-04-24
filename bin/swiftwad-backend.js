#!/usr/bin/env node

import cdk from 'aws-cdk-lib';
import { SwiftwadBackendStack } from '#root/lib/swiftwad-backend-stack';
import { BRANCH_NAME } from '#root/lib/config';

const app = new cdk.App();
new SwiftwadBackendStack(app, `SwiftwadBackendStack-${BRANCH_NAME}`, {}, BRANCH_NAME);
