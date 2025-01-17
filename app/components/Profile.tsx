'use client';
import { updateProfile } from '../lib/actions';
import { useFormState } from 'react-dom';
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  VStack,
  Box,
  Text,
  Textarea,
  Input,
  Button,
  Container,
  Heading,
  Divider,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Post as PostType, Profile } from '../lib/definitions';
import { getSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Post } from './Post';
import ProfilePost from './ProfilePost';

interface FormProps {
  profile?: Profile;
  posts: PostType[];
}

const initialState = { message: null, errors: {} };

export default function Profile({ profile, posts }: FormProps) {
  const [state, formAction] = useFormState(updateProfile, initialState);
  const [isEdit, setIsEdit] = useState(false);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    if (state !== null) setIsEdit(false);
  }, [state]);

  useEffect(() => {
    const getData = async () => {
      const session = await getSession();
      if (session.user.id === profile?.userId) setIsUser(true);
    };
    getData();
  }, [profile]);

  const newProfile = profile === undefined || profile === null;
  const dateTimeString = profile?.dateOfBirth;
  const dateString = dateTimeString ?? ''.split('T')[0];

  return (
    <Container maxW="container.md" mt={10}>
      <Heading mb={6}>User Profile</Heading>
      <form action={formAction}>
        {profile !== null && isUser ? (
          <FormControl display="flex" alignItems="center" mb={6}>
            <FormLabel htmlFor="email-alerts" mb="0">
              Edit Mode
            </FormLabel>
            <Switch isChecked={isEdit} id="email-alerts" onChange={() => setIsEdit(!isEdit)} />
          </FormControl>
        ) : null}

        {!isEdit && profile !== null ? (
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
            <VStack spacing={4} align="stretch">
              <Box>
                <Text fontWeight="semibold">Bio:</Text>
                <Divider my={2} />
                <Text color="gray.300">{newProfile ? 'Not provided' : profile.bio}</Text>
              </Box>
              <Box>
                <Text fontWeight="semibold">Date of Birth:</Text>
                <Divider my={2} />
                <Text color="gray.300">
                  {profile === undefined || profile.dateOfBirth === null
                    ? 'Not provided'
                    : profile.dateOfBirth.toDateString()}
                </Text>
              </Box>
              <Box>
                <Text fontWeight="semibold">Gender:</Text>
                <Divider my={2} />
                <Text color="gray.300">{newProfile ? 'Not provided' : profile.gender}</Text>
              </Box>
            </VStack>
          </Box>
        ) : (
          <>
            {profile !== null && (
              <Box>
                <FormControl id="bio" mb={4}>
                  <FormLabel htmlFor="bio">Bio</FormLabel>
                  <Textarea
                    id="bio"
                    name="bio"
                    defaultValue={profile === undefined || profile.bio === null ? '' : profile?.bio}
                    placeholder="Tell us about yourself"
                  />
                </FormControl>
                <FormControl id="dateOfBirth" mb={4}>
                  <FormLabel htmlFor="dateOfBirth">Date of Birth</FormLabel>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    defaultValue={newProfile ? '' : dateString}
                  />
                </FormControl>
                <FormControl id="gender" mb={6}>
                  <FormLabel htmlFor="gender">Gender</FormLabel>
                  <RadioGroup
                    id="gender"
                    name="gender"
                    defaultValue={
                      profile === undefined || profile.gender === null ? '' : profile?.gender
                    }
                  >
                    <Stack direction="row">
                      <Radio value="male">Male</Radio>
                      <Radio value="female">Female</Radio>
                      <Radio value="other">Other</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
                <Button variant={'outline'} type="submit">
                  Update Profile
                </Button>
              </Box>
            )}
          </>
        )}
      </form>
      <ProfilePost posts={posts} />
    </Container>
  );
}
