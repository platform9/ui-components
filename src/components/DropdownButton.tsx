import Button from 'src/elements/button'
import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Theme from 'src/theme-manager/themes/model'
import Text from 'src/elements/Text'
import SimpleLink from './SimpleLink'
import generateTestId from 'src/utils/test-helpers'

const useStyles = makeStyles((theme: Theme) => ({
  dropdownContainer: {
    display: 'inline-block',
    position: 'relative',
    '&:hover': {
      '& button': {
        borderRadius: '4px 4px 0px 0px ',
      },
      '& $dropdown': {
        opacity: 1,
        transform: 'scale(1)',
        zIndex: 100,
      },
    },
  },
  dropdown: {
    position: 'absolute',
    padding: theme.spacing(1, 0),
    background: theme.components.card.background,
    paddingInlineStart: 0,
    listStyle: 'none',
    marginBlockStart: 0,
    marginBlockEnd: 0,
    width: 'calc(100% - 2px)',
    textAlign: 'center',
    borderColor: theme.components.card.border,
    borderStyle: 'solid',
    borderWidth: '0px 1px 1px 1px',
    borderRadius: '0px 0px 4px 4px',

    opacity: 0,
    transform: 'scale(0)',
    transformOrigin: 'top center',
    transition: 'opacity .2s ease, transform .2s ease',
  },
  dropdownLink: {
    padding: theme.spacing(1, 0),
    transition: 'color .2s ease',
    lineHeight: '36px',
    '&:hover': {
      color: theme.components.typography.active,
    },
  },
}))

interface Link {
  link: string
  label: string
}

interface Props {
  links: Link[]
  addText?: string
}

const DropdownButton = ({ links, addText }: Props) => {
  const classes = useStyles({})

  return (
    <div className={classes.dropdownContainer}>
      <Button rightIcon="angle-down" data-testid={generateTestId(addText)}>
        {addText}
      </Button>
      <ul className={classes.dropdown}>
        {links.map((link) => (
          <li data-testid={generateTestId(link.label)} key={link.label}>
            <SimpleLink src={link.link} textDecoration="none">
              <Text variant="caption1" className={classes.dropdownLink}>
                {link.label}
              </Text>
            </SimpleLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DropdownButton
